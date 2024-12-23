const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.body.user_id);

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findOne({
    where: {
      username: req.body.username
    }
  });

  if(user === null || await argon2.verify(user.password_hash, req.body.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    username: req.body.username,
    password_hash: hash,
    email: req.body.email,
  });

  res.json(user);
};

exports.delete = async (req, res) => {
  const user = await db.user.destroy({
    where: {
      user_id: req.body.user_id,
    }
  });

  res.json(user);
};
