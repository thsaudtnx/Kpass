const Sequelize = require('sequelize');
const Business = require('./business');
const User = require('./user');
const Field = require('./field');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Business = Business;
db.User = User;
db.Field = Field;

Business.initiate(sequelize);
User.initiate(sequelize);
Field.initiate(sequelize);

Business.associate(db);
User.associate(db);
Field.associate(db);

module.exports = db;