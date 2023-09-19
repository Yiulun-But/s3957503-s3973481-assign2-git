const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const screentimes = await db.screentime.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(screentimes);
};

exports.one = async (req, res) => {
  const screentime = await db.screentime.findOne({
    where: {
      session_id: req.body.session_id,
    }
  })

  res.json(screentime)
}

// Create a review in the database.
exports.create = async (req, res) => {
  const screentime = await db.screentime.create({
    time: req.body.time,
    seats_remain: req.body.seats_remain,
    movie_id: req.body.movie_id
  });

  res.json(screentime);
};

exports.delete = async (req, res) => {
  const screentime = await db.screentime.destroy({
    where: {
      session_id: req.body.session_id,
    }
  });

  res.json(screentime);
};



