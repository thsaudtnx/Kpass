const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
  static initiate(sequelize){
    return super.init({
      username : {
        type : Sequelize.STRING(40),
        allowNull : false,
        unique : true,
      },
      password : {
        type : Sequelize.STRING(15),
        allowNull : false,
      },
      provider : {
        type : Sequelize.STRING(10),
        allowNull : false,
        defaultValue : 'local',
      },
      snsId : {
        type : Sequelize.STRING(30),
        allowNull : true,
      },
    }, {
      sequelize,
      timestamps : false,
      underscored : false,
      modelName : 'User',
      tableName : 'users',
      paranoid : true,
      charset : 'utf8',
      collate : 'utf8_general_ci',
    })
  }

  static associate(db){}
};