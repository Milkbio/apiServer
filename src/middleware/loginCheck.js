const {ErrorModel} = require('../model/res');

module.exports = async (context, next) => {
  if (context.session.userid) return next();
  context.body = new ErrorModel('用户未登录');
};