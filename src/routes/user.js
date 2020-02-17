const router = require('koa-router')();
const {loginController} = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/res');

router.prefix('/api/user');

router.post('/login', async (context) => {
  const result = await loginController(context.request);
  if (result.length) {
    result[0].password = '';

    // 登录成功后设置cookie,并保存在session里
    context.session.username = result[0].username;
    context.session.userid = result[0].id;
    context.body = new SuccessModel(result[0], '登录成功');

  } else {
    context.body = ErrorModel(null, '用户名或密码不正确');
  }
});

/*router.get('/login-test', async (context, next) => {
  const {session} = context;
  if (session.userid) {
    context.body = {
      code: 0,
      msg: '已登录'
    };
  } else {
    context.body = {
      code: -1,
      msg: '未登录'
    };
  }
});*/

module.exports = router;