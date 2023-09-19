const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const tickets = await db.ticket.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(tickets);
};

exports.one = async (req, res) => {
  const ticket = await db.ticket.findOne({
    where: {
      booking_id: req.body.booking_id,
    }
  })

  res.json(ticket)
}

// Create a review in the database.
exports.create = async (req, res) => {
  const ticket = await db.ticket.create({
    session_id: req.body.session_id,
    user_id: req.body.user_id,
    seats: req.body.seats,
  });

  res.json(ticket);
};

exports.delete = async (req, res) => {
  const ticket = await db.ticket.destroy({
    where: {
      booking_id: req.body.booking_id,
    }
  });

  res.json(ticket);
};



