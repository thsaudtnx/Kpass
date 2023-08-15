const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { server } = require('../serverURL');

const options = {
  swaggerDefinition : {
    openapi : "3.0.0",
    info : {
      version : "0.0.1",
      title : "KPASS",
      description : "Kpass API for manager web and user mobile"
    },
    servers : [
      {
        url : server, //요청 URL
      },
    ],
  },
  apis : ["./routes/*.js", "./routes/auth/*.js", "./routes/business/*.js", "./routes/mobile/*.js", ]
}
const specs = swaggerJsdoc(options);

module.exports = {swaggerUi, specs};