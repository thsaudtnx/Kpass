const Sequelize = require('sequelize');

module.exports = class Field extends Sequelize.Model {
  static initiate(sequelize) {
    Field.init({
      english: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      korean : {
        type : Sequelize.STRING,
        allowNull : false,
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Field',
      tableName: 'field',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {}
};