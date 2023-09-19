module.exports = (sequelize, DataTypes) =>
  sequelize.define("ticket_reserve", {
    booking_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    seats: {
      type: DataTypes.INTEGER,
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
