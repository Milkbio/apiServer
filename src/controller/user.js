const {execSQL} = require('../database/db');

const login = async (req) => {
  const {username, password} = req.body;
  const sql = `select * from users where username='${username}' and password='${password}'`;

  return execSQL(sql).then(res => res);
};


module.exports = {
  loginController: login
};