var Promise = require('promise');
var superagent = require('superagent-promise')(require('superagent'), Promise);


var URL = 'https://api.tfl.gov.uk/Journey'

module.exports = function(appId, appKey) {

  var auth = { app_id: appId, app_key: appKey };

  var journey = function journey(origin, destination, options) {
    var url = [URL, 'JourneyResults', origin, 'to', destination].join('/');
    return superagent.get(url).query(options).query(auth);
  }

  journey.meta = function (type) {
    var url = [URL, 'Meta', type].join('/');
    return superagent.get(url).query(auth);
  }

  journey.URL = URL;

  return journey;
}
