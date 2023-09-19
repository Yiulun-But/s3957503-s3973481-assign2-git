module.exports = (sequelize, DataTypes) =>
  sequelize.define("screentime", {
    session_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    time: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    seats_remain: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
