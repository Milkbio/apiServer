const http = require('http');
const handleHttp = require('./src/routes/');
require('./src/utils/logger');
require('./src/utils/log');

http.createServer(handleHttp).listen(3333);