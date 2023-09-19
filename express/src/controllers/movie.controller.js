const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const movies = await db.movie.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(movies);
};

exports.one = async (req, res) => {
  const movie = await db.movie.findOne({
    where: {
      movie_id: req.body.movie_id,
    }
  })

  res.json(movie)
}

// Create a review in the database.
exports.create = async (req, res) => {
  const movie = await db.movie.create({
    title: req.body.title,
    synopsis: req.body.synopsis,
  });

  res.json(movie);
};

exports.delete = async (req, res) => {
  const movie = await db.movie.destroy({
    where: {
      movie_id: req.body.movie_id,
    }
  });

  res.json(movie);
};



