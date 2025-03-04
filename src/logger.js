const winston = require('winston');

// Create a Winston logger instance
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error', format: winston.format.json() }),
        new winston.transports.File({ filename: 'combined.log', format: winston.format.json() }),
    ],
    exceptionHandlers: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ filename: 'exceptions.log', format: winston.format.json() })
    ],
    exitOnError: false
});

// Optionally, catch unhandled promise rejections and rethrow them as exceptions
process.on('unhandledRejection', (ex) => {
    throw ex;
});

module.exports = logger;  // <-- CommonJS export
