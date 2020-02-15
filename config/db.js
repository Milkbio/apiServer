const env = process.env.NODE_ENV;

let MYSQL_CONFIG;

switch (env) {
    case 'development':
        MYSQL_CONFIG = {
            host: 'localhost',
            user: 'root',
            password: '!Honest26910',
            port: '3306',
            database: 'ebusiness'
        };
        break;
    case 'production':
        MYSQL_CONFIG = {
            host: 'www.baidu.com',
            user: 'root',
            password: '!Honest26910',
            port: '3306',
            database: 'ebusiness'
        };
        break;
}

module.exports = {
    MYSQL_CONFIG
}