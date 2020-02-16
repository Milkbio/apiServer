const env = process.env.NODE_ENV;

let MYSQL_CONFIG;
let REDIS_CONFIG;

switch (env) {
  case 'development':
    MYSQL_CONFIG = {
      host: 'localhost',
      user: 'root',
      password: '!Honest26910',
      port: '3306',
      database: 'ebusiness'
    };
    REDIS_CONFIG = {
      port: 6379,
      host: '127.0.0.1'
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
    REDIS_CONFIG = {
      port: 6379,
      host: '127.0.0.1'
    };
    break;
}

module.exports = {
  MYSQL_CONFIG
}