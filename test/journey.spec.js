import { expect } from 'chai';
import Journey from '../src/journey';


describe('Journey', () => {

  const appId = '12345';
  const appKey = 'abcdef';
  const journey = Journey(appId, appKey);

  const origin = '1001067';   // City Thameslink
  const destination = '1000123'   // Kentish Town

  it('should construct from-to url', () => {
    const req = journey(origin, destination);
    expect(req.url).to.be.eql(journey.URL + '/JourneyResults/1001067/to/1000123')
  })

  it('should correctly pass options through', () => {
    const req = journey(origin, destination, {
      via: '1000123',
      walkingSpeed: 'fast',
      walkingOptimization: true
    });
    expect(req.qs).to.have.property('via', '1000123');
    expect(req.qs).to.have.property('walkingSpeed', 'fast');
    expect(req.qs).to.have.property('walkingOptimization', true);
  })

  it('should attach auth query params', () => {
    const req = journey(origin, destination);
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('should have a meta method which accepts a type', () => {
    const req = journey.meta('modes');
    expect(req.url).to.be.eql(journey.URL + '/Meta/modes');
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

})
