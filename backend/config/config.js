require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "kpass",
    host: "127.0.0.1",
    dialect: "mysql",
    port: '3306',
  },
  test: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    logging : false,
  }
}

