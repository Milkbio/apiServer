const router = require('koa-router')();
const userController = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/res');

router.prefix('/api/user');

// 登录
router.post('/login', async (context) => {
  const result = await userController.login(context.request);
  if (result.length) {
    result[0].password = '';

    // 登录成功后设置cookie,并保存在session里
    context.session.username = result[0].username;
    context.session.userid = result[0].id;
    context.body = new SuccessModel(result[0], '登录成功');

  } else {
    context.body = new ErrorModel(null, '用户名或密码不正确');
  }
});

// 获取用户信息
router.post('/get_information', async (context) => {
  const result = await userController.getUserInfo(context);

  if (result.length) {
    context.body = new SuccessModel(result[0], '操作成功');
  } else {
    context.body = new ErrorModel('用户未登录');
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