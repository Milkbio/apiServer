const mysql = require('mysql');
const {MYSQL_CONFIG} = require('../../config/db');

// 创建连接对象
const connect = mysql.createConnection(MYSQL_CONFIG);

connect.connect(err => {
  if (err) return console.error('error connecting: ' + err.stack);
  console.log('connected as id ' + connect.threadId);
});

// 执行sql语句
const execSQL = function (sql) {
  return new Promise((resolve, reject) => {
    connect.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
      console.info('查询结果', result);
    })
  })
};

module.exports = {
  execSQL
};
