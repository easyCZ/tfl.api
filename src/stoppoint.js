var Promise = require('promise');
var superagent = require('superagent-promise')(require('superagent'), Promise);


var URL = 'https://api.tfl.gov.uk/StopPoint'

module.exports = function (appId, appKey) {

  var auth = { app_id: appId, app_key: appKey };

  var stoppoint = function stoppoint(options) {
    return superagent.get(URL).query(options).query(auth);
  }

  stoppoint.byId = function byId(stopId) {
    return superagent.get(URL + '/' + stopId).query(auth);
  }

  stoppoint.byIdArrivals = function byIdArrivals(stopId) {
    return superagent.get(URL + '/' + stopId + '/Arrivals').query(auth);
  }

  stoppoint.byCanReachOnLine = function byCanReachOnLine(stopId, lineId, options) {
    var stopURL = [URL, stopId, 'CanReachOnLine', lineId].join('/');
    return superagent.get(stopURL).query(options).query(auth);
  }

  stoppoint.byDirectionTo = function byDirectionTo(stopId, toStopPointId, options) {
    var stopURL = [URL, stopId, 'DirectionTo', toStopPointId].join('/');
    return superagent.get(stopURL).query(options).query(auth);
  }

  stoppoint.byIdDisruption = function byIdDisruption(stopIds, options) {
    var stopURL = [URL, stopIds, 'Disruption'].join('/');
    return superagent.get(stopURL).query(options).query(auth);
  }

  stoppoint.byIdDisruptionStartEnd = function byIdDisruptionStartEnd(stopIds, startDate, endDate, options) {
    var stopURL = [URL, stopIds, 'Disruption'].join('/');
    stopURL = stopURL + '?startDate=' + startDate + '&endDate=' + endDate;
    return superagent.get(stopURL).query(options).query(auth);
  }

  stoppoint.meta = function meta(metadataType) {
    var stopURL = URL + '/Meta/' + metadataType;
    return superagent.get(stopURL).query(auth);
  }

  stoppoint.mode = function mode(modes, options) {
    var stopURL = URL + '/Mode/' + modes;
    return superagent.get(stopURL).query(options).query(auth);
  }

  stoppoint.modeDisruption = function modeDisruption(modes, options) {
    var stopURL = [URL, 'Mode', modes, 'Disruption'].join('/');
    return superagent.get(stopURL).query(options).query(auth);
  }

  stoppoint.modeDisruptionStartEnd = function modeDisruptionStartEnd(modes, startDate, endDate, options) {
    var stopURL = [URL, 'Mode', modes, 'Disruption'].join('/');
    stopURL = stopURL + '?startDate=' + startDate + '&endDate=' + endDate;
    return superagent.get(stopURL).query(options).query(auth);
  }

  stoppoint.route = function route(stopId, options) {
    var stopURL = [URL, stopId, 'Route'].join('/');
    return superagent.get(stopURL).query(options).query(auth);
  }

  stoppoint.search = function search(query, options) {
    var stopURL = URL + '/Search/' + query;
    return superagent.get(stopURL).query(options).query(auth);
  }

  stoppoint.servicetypes = function serviceTypes(stopId, options) {
    var stopURL = URL + '/ServiceTypes?id=' + stopId;
    return superagent.get(stopURL).query(options).query(auth);
  }

  stoppoint.sms = function sms(stopId, options) {
    var stopURL = URL + '/Sms/' + stopId;
    return superagent.get(stopURL).query(options).query(auth);
  }

  stoppoint.type = function type(types) {
    var stopURL = URL + '/Type/' + types;
    return superagent.get(stopURL).query(auth);
  }

  stoppoint.URL = URL;

  return stoppoint;
}
