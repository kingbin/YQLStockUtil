var path    = require('path')
  , winston = require('winston')
  , logger = new winston.Logger({
    transports: [
        new (winston.transports.Console)({
            level: 'debug',
            handleExcptions: true,
            json: false,
            colorize: true
        }),
        new (winston.transports.File)({
            level: 'info',
            filename: path.join(process.cwd(),'Logs','info.log'),
            handleExcptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        })
    ]
    , exceptionHandlers: [
        new winston.transports.File({ filename: path.join(process.cwd(),'Logs','exceptions.log') })
    ]
    , exitOnError: false
  });

logger.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};

module.exports=logger;
