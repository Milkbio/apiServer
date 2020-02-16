const redis = require('redis');
const {port, host} = require('../../config/db').REDIS_CONFIG;

const redisClient = redis.createClient(port, host);

redisClient.on('error', err => {
  console.error(err);
});

redisClient.set('myName', 'zhangsan', redis.print);

redisClient.get('myName', (err, val) => {
  if (err) return console.error(err);
  console.log(val);
  redisClient.quit();
});

exports.setRedis = (key, value) => {
  const val = typeof value === 'object' ? JSON.stringify(value) : value;
  redisClient.set(key, val, redis.print)
};

exports.getRedis = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) return reject(err);
      if (value === null) return resolve(value);
      
      try {
        resolve(JSON.parse(value));
      } catch (e) {
        resolve(value);
      }
      // redisClient.quit();
    });
  });
};

