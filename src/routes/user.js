const {login} = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/res');
const {setCookieExpire} = require('../utils/utils');

module.exports = async function handleUserRoutes(req, res) {
  const {method, path} = req;
  if (method.toUpperCase() === 'POST' && path === '/api/user/login') {
    const result = await login(req);
    if (result.length) {
      result[0].password = '';

      // 登录成功后设置cookie
      res.setHeader('Set-Cookie', `username=${result[0].username}; path=/; httpOnly; expires=${setCookieExpire()}`);
      return new SuccessModel(result[0], '登录成功');
    } else {
      return new ErrorModel(null, '用户名或密码不正确');
    }
  }
}