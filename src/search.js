var Promise = require('promise');
var superagent = require('superagent-promise')(require('superagent'), Promise);


var URL = 'https://api.tfl.gov.uk/Search'

module.exports = function (appId, appKey) {

  var auth = { app_id: appId, app_key: appKey };

  var search = function search(options) {
    return superagent.get(URL).query(options).query(auth);
  }

  search.meta = function meta(metadataType) {
    var metaURL = URL + '/Meta/' + metadataType;
    return superagent.get(metaURL).query(auth);
  }

  search.busSchedules = function (query) {
    var busURL = URL + '/BusSchedules/';
    return superagent.get(busURL).query({ query: query }).query(auth)
  }

  search.URL = URL;

  return search;
}
