const Sequelize = require('sequelize');
const Business = require('./business');
const User = require('./user');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Business = Business;
db.User = User;

Business.initiate(sequelize);
User.initiate(sequelize);

Business.associate(db);
User.associate(db);

module.exports = db;