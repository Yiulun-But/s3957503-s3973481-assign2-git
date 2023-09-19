const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.movie = require("./models/movie.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.ticket_reserve = require("./models/ticketReserve.js")(db.sequelize, DataTypes);
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.screentime = require("./models/screentime.js")(db.sequelize, DataTypes);

// Relate post and user.
db.user.hasMany(db.review, { foreignKey: { name: "user_id", allowNull: false }, onDelete: 'cascade'})
db.user.hasMany(db.ticket_reserve, { foreignKey: { name: "user_id", allowNull: false }, onDelete: 'cascade' })
db.movie.hasMany(db.review, { foreignKey: { name: "movie_id", allowNull: false }, onDelete: 'cascade' })
db.movie.hasMany(db.screentime, { foreignKey: { name: "movie_id", allowNull: false }, onDelete: 'cascade' })
db.screentime.hasMany(db.ticket_reserve, {foreignKey: { name: "booking_id", allowNull: false }, onDelete: 'cascade' })

// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync({ alter: true });

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({ username: "yiulun", password_hash: hash, first_name: "Yiulun", last_name : "But" });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ username: "shekhar", password_hash: hash, first_name: "Shekhar", last_name : "Kalra" });

  const screentimes = ['10:30 AM', '12:30 AM', '3:00 PM', '6:00 PM', '7:30 PM', '9:00 PM'];


  await db.movie.create([
    { title: 'Barbie', 
      synopsis: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.', 
     },
    { title: 'Oppenheimer', 
      synopsis: "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.", 
    },
    { title: 'Wonka', 
      synopsis: 'Focusing on a young Willy Wonka and how he came to meet the Oompa-Loompas on one of his earliest adventures.', 
    },
    { title: 'Blue Beetle', 
      synopsis: "Jaime Reyes suddenly finds himself in possession of an ancient relic of alien biotechnology called the Scarab. When the Scarab chooses Jaime to be its symbiotic host, he's bestowed with an incredible suit of armor that's capable of extraordinary and unpredictable powers, forever changing his destiny as he becomes the superhero Blue Beetle.", 
    },
    { title: 'Gran Turismo', 
      synopsis: "A player wins a series of Nissan-sponsored video game competitions through his gaming skills and becomes a real-life professional race car driver.", 
    },
    { title: 'Transformers: Rise of the Beasts', 
      synopsis: 'Set in 1994, the film follows ex-military electronics expert Noah Diaz and artifact researcher Elena Wallace as they help the Autobots and the Maximals protect an artifact known as the Transwarp Key from the villainous Terrorcons who intend to use it to bring their master Unicron to Earth.', 
    },
    { title: "Five Nights at Freddy's", 
      synopsis: "A troubled security guard begins working at Freddy Fazbear's Pizzeria. While spending his first night on the job, he realizes the late shift at Freddy's won't be so easy to make it through.", 
    },
    { title: 'Insidious: The Red Door', 
      synopsis: "Josh Lambert heads east to drop his son, Dalton, off at school. However, Dalton's college dream soon becomes a living nightmare when the repressed demons of his past suddenly return to haunt them both.", 
    }
  ]);

  const movies = await db.movie.findAll();
  for (let time of screentimes) {
    for (let movie of movies) {
      await db.screentime.create({
        time: time,
        seats_remain: 10,
        movie_id: movie.movie_id
      })
    }
  }
}

module.exports = db;
