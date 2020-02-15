const setCookieExpire = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toUTCString();
};
module.exports = {
  setCookieExpire
};