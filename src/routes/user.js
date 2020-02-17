const router = require('koa-router')();
// router.prefix('');

router.post('/api/user/login', async (context, next) => {
  context.body = {
    aa: 11111
  }
});


module.exports = router;