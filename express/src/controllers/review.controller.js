const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const reviews = await db.review.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(reviews);
};

exports.one = async (req, res) => {
  const review = await db.review.findByPk(req.body.review_id);

  res.json(review);
};

// Create a review in the database.
exports.create = async (req, res) => {
  const review = await db.review.create({
    content: req.body.content,
    rating: req.body.rating,
    username: req.body.username,
    movie_id: req.body.movie_id,
  });

  res.json(review);
};

exports.delete = async (req, res) => {
  const review = await db.review.destroy({
    where: {
      review_id: req.body.review_id,
    }
  });

  res.json(review);
};

exports.view = async (req, res) => {
  const reviews = await db.review.findAll({
    where: {
      user_id: req.body.user_id,
    }
  });

  res.json(reviews);
};