module.exports = (sequelize, DataTypes) =>
  sequelize.define("movie", {
    movie_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull:false
    },
  }, {
  });
