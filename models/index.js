const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.databse, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Song = require('./songs')(sequelize, Sequelize);
db.Review = require('./reviews')(sequelize, Sequelize);
db.Coming = require('./comings')(sequelize, Sequelize);
db.Announce = require('./announces')(sequelize, Sequelize);

db.Song.hasMany(db.Review, {foreignKey: 'reviewtitle', sourceKey: 'id'});
db.Review.belongsTo(db.Song, {foreignKey: 'reviewtitle', sourceKey: 'id'});

module.exports = db;
