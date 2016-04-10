import { expect } from 'chai';
import Place from '../src/place';


describe('Place', () => {

  const appId = '12345';
  const appKey = 'abcdef';
  const place = Place(appId, appKey);

  const thameslink = {
    lat: 51.5138,
    lng: 0.1035
  }

  it('should be a top level function', () => {
    expect(place).to.be.function;
  })

  it('default should pass options through as query params', () => {
    const options = { lat: thameslink.lat, lon: thameslink.lng, radius: 1000}
    const req = place(options)

    expect(req.qs).to.have.property('lat', thameslink.lat);
    expect(req.qs).to.have.property('lon', thameslink.lng);
    expect(req.qs).to.have.property('radius', 1000);
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('byId should accept placeId', () => {
    const req = place.byId('WaterfreightWharf_022')

    expect(req.url).to.be.eql(place.URL + '/WaterfreightWharf_022')
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('byId should pass additional options through', () => {
    const req = place.byId('WaterfreightWharf_022', { includeChildren: true })

    expect(req.qs).to.have.property('includeChildren', true);
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('byTypeAtLanLon should correctly construct url', () => {
    const req = place.byTypeAtLatLon('placeTypes', thameslink.lat, thameslink.lng);

    expect(req.url).to.be.eql(place.URL + '/placeTypes/At/51.5138/0.1035')
  })

  it('byTypeAtLanLon should pass through auth', () => {
    const req = place.byTypeAtLatLon('placeTypes', thameslink.lat, thameslink.lng);

    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('meta should construct the url', () => {
    const req = place.meta('placeTypes');

    expect(req.url).to.be.eql(place.URL + '/Meta/placeTypes')
  })

})
