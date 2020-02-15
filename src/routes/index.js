const qs = require('querystring');
const handleUserRoutes = require('./user');

// 处理POST请求的参数
const getPostData = function (req) {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    /*if (req.headers['Content-Type'] !== 'application/json') {
        resolve({});
        return;
    }*/
    if (req.method === 'POST') {
      let data = '';
      req.on('data', chunk => {
        data += chunk.toString();
      })
      req.on('end', () => {
        if (!data) {
          resolve({});
          return;
        }
        resolve(qs.parse(data));
      })
    }
  })
};

module.exports = async function handleHttp(req, res) {
  // 设置返回格式
  res.setHeader('Content-Type', 'application/json');
  // 设置允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, PUT, POST, GET, OPTIONS');

  if (req.method.toLowerCase() === 'options') { //让options尝试请求快速结束
    res.send(200);
    return;
  }
  const {url} = req;
  const array = url.split('?');
  req.path = array[0];

  // 解析GET请求的参数
  req.query = qs.parse(array[1]);

  // 解析POST请求中的参数
  req.body = await getPostData(req);

  global.logger.info('GET请求参数', req.query);
  global.logger.info('POST请求参数', req.body);

  // 解析cookie
  const cookies = req.headers['cookies'] || '';


  const userData = await handleUserRoutes(req, res);

  if (userData) {
    return res.end(JSON.stringify(userData));
  }

  // 未命中路由返回404
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('404 Not Found');
  res.end();
}