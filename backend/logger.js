const {createLogger, format, transports, transport} = require('winston');

const logger = createLogger({
  level : 'debug',
  format : format.json(),
  transports : [
    new transports.File({filename : 'combined.log'}),
    new transports.File({filename: 'error.log', level : 'error'}),
    new transports.Console(),
  ],
});

if (process.env.NODE_ENV !== 'production'){
  logger.add(new transports.Console({format : format.simple()}));
}

module.exports = logger;