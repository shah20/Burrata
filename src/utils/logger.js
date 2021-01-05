const log4js = require('log4js');

const config = {
    appenders: {
        consoleAppender: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '%d - [%c]:[%p]: %m'
            }
        }
    },
    categories: {
        default: {
            appenders: ['consoleAppender'],
            level: 'info'
        }
    }
}

log4js.configure(config);

const getLogger = (category) => {
    return log4js.getLogger(category);
}

module.exports = {
    getLogger
}