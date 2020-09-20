module.exports = (sequelize, DataTypes) => {
  return sequelize.define('song', {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    singer: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    album: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });
}
