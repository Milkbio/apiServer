const http = require('http');
const handleHttp = require('./src/routes/');
require('./src/utils/logger');

http.createServer(handleHttp).listen(3333);