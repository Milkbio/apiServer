const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const koaSession = require('koa-generic-session');
const koaRedis = require('koa-redis');

const {REDIS_CONFIG} = require('./config/db');

// const index = require('./routes/index');
const userRoute = require('./src/routes/user');

const {ErrorModel} = require('./src/model/res');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// session
app.keys = ['fg@NNwrDw54e6co@'];
app.use(koaSession({
  key: 'uni_id',
  prefix: 'JSSESSIONID::',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 30 * 60 * 1000
  },
  store: koaRedis({
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
  })
}));

// 添加拦截器
/*app.use(async (context, next) => {
  const {url} = context.request;
  const unauthUrls = ['/api/user/login'];
  if (!unauthUrls.includes(url) && !context.session.userid) {
    context.status = 401;
    context.body = new ErrorModel('用户未登录');
    return;
  }
  await next();
});*/

// routes
// app.use(index.routes(), index.allowedMethods())
app.use(userRoute.routes(), userRoute.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;