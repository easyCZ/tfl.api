module.exports = function (appId, appKey) {
  return {
    search: require('./search.js')(appId, appKey)
  };
}
