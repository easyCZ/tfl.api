import { expect } from 'chai';
import StopPoint from '../src/stoppoint';


describe('StopPoint', () => {

  const appId = '12345';
  const appKey = 'abcdef';
  const stoppoint = StopPoint(appId, appKey);

  const modes = 'tfl,bus';
  const lineId = '123';
  const toStopPointId = '456';
  const stopIds = '490008434N,490014185E';
  const startDate = '2016-08-12';
  const endDate = '2016-08-14';
  const stopTypes = 'NaptanPublicBusCoachTram,'
  const stopId = '490008434N';

  const wandsworthbridge = {
    lat: 51.467074,
    lng: -0.188808
  }

  it('should be a top level function', () => {
    expect(stoppoint).to.be.function;
  })

  it('default should pass options through as query params', () => {
    const options = { lat: wandsworthbridge.lat, lon: wandsworthbridge.lng, stopTypes: 'NaptanPublicBusCoachTram'};
    const req = stoppoint(options);

    expect(req.qs).to.have.property('lat', wandsworthbridge.lat);
    expect(req.qs).to.have.property('lon', wandsworthbridge.lng);
    expect(req.qs).to.have.property('stopTypes', 'NaptanPublicBusCoachTram');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('byId should accept stopId', () => {
    const req = stoppoint.byId(stopId);

    expect(req.url).to.be.eql(stoppoint.URL + '/' + stopId);
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('byIdArrivals should correctly construct url', () => {
    const req = stoppoint.byIdArrivals(stopId);

    expect(req.url).to.be.eql(stoppoint.URL + '/490008434N/Arrivals');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('byCanReachOnLine should accept stopId, lineId', () => {
    const req = stoppoint.byCanReachOnLine(stopId, lineId);

    expect(req.url).to.be.eql(stoppoint.URL + '/490008434N/CanReachOnLine/123');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('byCanReachOnLine should pass additional options through', () => {
    const req = stoppoint.byCanReachOnLine(stopId, lineId, { serviceTypes: 'regular,night' });

    expect(req.qs).to.have.property('serviceTypes', 'regular,night');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('byDirectionTo should accept stopId, toStopPointId', () => {
    const req = stoppoint.byDirectionTo(stopId, toStopPointId);

    expect(req.url).to.be.eql(stoppoint.URL + '/490008434N/DirectionTo/456');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('byDirectionTo should pass additional options through', () => {
    const req = stoppoint.byDirectionTo(stopId, toStopPointId, { lineid: 'victoria' });

    expect(req.qs).to.have.property('lineid', 'victoria');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('byIdDisruption should correctly construct url', () => {
    const req = stoppoint.byIdDisruption(stopIds);

    expect(req.url).to.be.eql(stoppoint.URL + '/490008434N,490014185E/Disruption');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('byIdDisruption should pass additional options through', () => {
    const req = stoppoint.byIdDisruption(stopIds, { getFamily: false,  includeRouteBlockedStops: false});

    expect(req.qs).to.have.property('getFamily', false);
    expect(req.qs).to.have.property('includeRouteBlockedStops', false);
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('byIdDisruptionStartEnd should correctly construct url', () => {
    const req = stoppoint.byIdDisruptionStartEnd(stopIds, startDate, endDate);

    expect(req.url).to.be.eql(stoppoint.URL + '/490008434N,490014185E/Disruption?startDate=2016-08-12&endDate=2016-08-14');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('byIdDisruptionStartEnd should pass additional options through', () => {
    const req = stoppoint.byIdDisruptionStartEnd(stopIds, startDate, endDate, { getFamily: false,  includeRouteBlockedStops: false});

    expect(req.qs).to.have.property('getFamily', false);
    expect(req.qs).to.have.property('includeRouteBlockedStops', false);
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('meta should construct the url', () => {
    const req = stoppoint.meta('metadataType');

    expect(req.url).to.be.eql(stoppoint.URL + '/Meta/metadataType');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('mode should construct the url', () => {
    const req = stoppoint.mode(modes);

    expect(req.url).to.be.eql(stoppoint.URL + '/Mode/tfl,bus');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('mode should pass additional options through', () => {
    const req = stoppoint.mode(modes, { page: 1});

    expect(req.qs).to.have.property('page', 1);
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('modeDisruption should construct the url', () => {
    const req = stoppoint.modeDisruption(modes);

    expect(req.url).to.be.eql(stoppoint.URL + '/Mode/tfl,bus/Disruption');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('modeDisruption should pass additional options through', () => {
    const req = stoppoint.modeDisruption(modes, { includeRouteBlockedStops: true});

    expect(req.qs).to.have.property('includeRouteBlockedStops', true);
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('modeDisruptionStartEnd should construct the url', () => {
    const req = stoppoint.modeDisruptionStartEnd(modes, startDate, endDate);

    expect(req.url).to.be.eql(stoppoint.URL + '/Mode/tfl,bus/Disruption?startDate=2016-08-12&endDate=2016-08-14');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('modeDisruptionStartEnd should pass additional options through', () => {
    const req = stoppoint.modeDisruptionStartEnd(modes, startDate, endDate, { includeRouteBlockedStops: false});

    expect(req.qs).to.have.property('includeRouteBlockedStops', false);
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('route should construct the url', () => {
    const req = stoppoint.route(stopId);

    expect(req.url).to.be.eql(stoppoint.URL + '/490008434N/Route');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })  

  it('route should pass additional options through', () => {
    const req = stoppoint.route(stopId, { serviceTypes: 'regular,night'});

    expect(req.qs).to.have.property('serviceTypes', 'regular,night');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('search should construct the url', () => {
    const req = stoppoint.search('Townmead Road');

    expect(req.url).to.be.eql(stoppoint.URL + '/Search/Townmead Road');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })  

  it('search should pass additional options through', () => {
    const req = stoppoint.search('Townmead Road', { modes: 'bus', faresOnly: false, maxResults: 50, lines: 2, includeHubs: true});

    expect(req.qs).to.have.property('modes', 'bus');
    expect(req.qs).to.have.property('faresOnly', false);
    expect(req.qs).to.have.property('maxResults', 50);
    expect(req.qs).to.have.property('lines', 2);
    expect(req.qs).to.have.property('includeHubs', true);
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('servicetypes should construct the url', () => {
    const req = stoppoint.servicetypes(stopId);

    expect(req.url).to.be.eql(stoppoint.URL + '/ServiceTypes?id=490008434N');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  }) 

  it('servicetypes should pass additional options through', () => {
    const req = stoppoint.servicetypes(stopId, { lineids: '123', modes: 'bus'});

    expect(req.qs).to.have.property('lineids', '123');
    expect(req.qs).to.have.property('modes', 'bus');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('sms should construct the url', () => {
    const req = stoppoint.sms(stopId);

    expect(req.url).to.be.eql(stoppoint.URL + '/Sms/490008434N');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })  

  it('sms should pass additional options through', () => {
    const req = stoppoint.sms(stopId, { output: 'web'});

    expect(req.qs).to.have.property('output', 'web');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('type should construct the url', () => {
    const req = stoppoint.type('NaptanPublicBusCoachTram');

    expect(req.url).to.be.eql(stoppoint.URL + '/Type/NaptanPublicBusCoachTram');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })  

})
