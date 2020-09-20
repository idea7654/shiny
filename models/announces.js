module.exports = (sequelize, DataTypes) => {
  return sequelize.define('announce', {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    announce: {
      type: DataTypes.STRING(2000),
      allowNull: false
    }
  });
}
