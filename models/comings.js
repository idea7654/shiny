module.exports = (sequelize, DataTypes) => {
  return sequelize.define('coming', {
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
    },
    Date: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  });
}
