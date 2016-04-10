var Promise = require('promise');
var superagent = require('superagent-promise')(require('superagent'), Promise);


var URL = 'https://api.tfl.gov.uk/Occupancy'

module.exports = function (appId, appKey) {

  var occupancy = {};
  var auth = { app_id: appId, app_key: appKey };

  occupancy.carPark = function carPark() {
    return superagent.get(URL + '/CarPark').query(auth);
  }

  occupancy.carParkById = function carParkById(id) {
    var url = [URL, 'CarPark', id].join('/');
    return superagent.get(url).query(auth);
  }

  occupancy.URL = URL;

  return occupancy;
}
