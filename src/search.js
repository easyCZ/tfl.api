var Promise = require('promise');
var superagent = require('superagent-promise')(require('superagent'), Promise);


var URL = 'https://api.tfl.gov.uk/Search'

function search(options) {
  return superagent.get(URL).query(options);
}

search.meta = function meta(metadataType) {
  var metaURL = URL + '/Meta/' + metadataType;
  return superagent.get(metaURL);
}

search.busSchedules = function (query) {
  var busURL = URL + '/Meta/';
  return superagent.get(busURL).query({ query: query })
}

module.exports = search
