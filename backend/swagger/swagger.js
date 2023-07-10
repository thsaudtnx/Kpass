const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition : {
    openapi : "3.0.0",
    info : {
      version : "0.0.1",
      title : "KPASS",
      description : "모바일, 관리자 웹을 위한 Kpass API"
    },
    servers : [
      {
        url : "http://localhost:3000", //요청 URL
      },
    ],
  },
  apis : ["./routes/*.js", "./routes/auth/*.js", "./routes/business/*.js", "./routes/mobile/*.js", ]
}
const specs = swaggerJsdoc(options);

module.exports = {swaggerUi, specs};