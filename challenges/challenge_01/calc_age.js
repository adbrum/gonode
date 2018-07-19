module.exports = function (dateString) {
  const birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / 31557600000);
};
