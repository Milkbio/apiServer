const redis = require('redis');

const redisClient = redis.createClient(6379, '127.0.0.1');

redisClient.on('error', err => {
  console.error(err);
});

redisClient.set('myName', 'zhangsan', redis.print);

redisClient.get('myName', (err, val) => {
  if (err) return console.error(err);
  console.log(val);
  redisClient.quit();
});
