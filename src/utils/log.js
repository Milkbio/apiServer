const path = require('path');
const fs = require('fs');

// 生成write steam
const createWriteStram = (filename) => {
  const fullFileName = path.join(__dirname, '../../logs', filename);
  const ws = fs.createWriteStream(fullFileName, {
    flag: 'a'
  });
  return ws;
};

const accessWS = createWriteStram('access.log');

/**
 * 写访问日志
 * @param log
 */
const access = (log) => {
  accessWS.write(log + '\n');
};
global.access = access;

module.exports = {
  access
};