var Promise = require('promise');
var superagent = require('superagent-promise')(require('superagent'), Promise);


var URL = 'https://api.tfl.gov.uk/AccidentStats/'

module.exports = function (appId, appKey) {

  var auth = { app_id: appId, app_key: appKey };

  var accidentstats =  function accidentstats(year) {
    return superagent.get(URL + year).query(auth);
  }

  accidentstats.URL = URL;

  return accidentstats;
}
