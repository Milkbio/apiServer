const {execSQL} = require('../database/db');

const login = async (req) => {
  const {username, password} = req.body;
  const sql = `select * from users where username='${username}' and password='${password}'`;

  return execSQL(sql).then(res => res);
};
const getUserInfo = async (context) => {
  const {session} = context;
  if (session.userid) {
    const sql = `select * from users where id='${session.userid}'`;
    return execSQL(sql).then(res => res);
  } else {
    return [];
  }
};


module.exports = {
  login,
  getUserInfo
};