const Sequelize = require('sequelize');

module.exports = class Business extends Sequelize.Model {
  static initiate(sequelize) {
    Business.init({
      logo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      addressdetail : {
        type : Sequelize.STRING,
        allowNull : true,
      },
      latitude: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      kpass: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      travelwallet: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      modelName: 'Business',
      tableName: 'business',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {}
};