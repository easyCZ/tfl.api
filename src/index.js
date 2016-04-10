module.exports = function (appId, appKey) {

  return {
    search: require('./search')(appId, appKey),
    accidentstats: require('./accidentstats')(appId, appKey)
  };

}
