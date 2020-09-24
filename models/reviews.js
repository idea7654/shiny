module.exports = (sequelize, DataTypes) => {
  return sequelize.define('review', {
    review: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  });
}
