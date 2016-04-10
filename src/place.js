var Promise = require('promise');
var superagent = require('superagent-promise')(require('superagent'), Promise);


var URL = 'https://api.tfl.gov.uk/Place'

module.exports = function(appId, appKey) {

  var auth = { app_id: appId, app_key: appKey };

  var place = function place(options) {
    return superagent.get(URL).query(options).query(auth);
  }

  place.byId = function byId(placeId, options) {
    return superagent.get(URL + '/' + placeId).query(options).query(auth);
  }

  place.byTypeAtLatLon = function byTypeAtLatLon(type, lat, lon) {
    var url = [URL, type, 'At', lat, lon].join('/');
    return superagent.get(url).query(auth);
  }

  place.meta = function meta(metaType) {
    var url = [URL, 'Meta', metaType].join('/')
    return superagent.get(url).query(auth);
  }

  place.URL = URL;

  return place;

}
