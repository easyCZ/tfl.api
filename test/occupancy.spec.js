import { expect } from 'chai';
import Occupancy from '../src/occupancy';


describe('Occupancy', () => {

  const appId = '12345';
  const appKey = 'abcdef';
  const occupancy = Occupancy(appId, appKey);

  it('should expose a car park method', () => {
    expect(occupancy).to.have.property('carPark')
  })

  it('carPark should construct the correct url', () => {
    const req = occupancy.carPark();
    expect(req.url).to.be.eql(occupancy.URL + '/CarPark')
  })

  it('carPark should add auth', () => {
    const req = occupancy.carPark();
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

  it('should expose a car park by id method', () => {
    expect(occupancy).to.have.property('carParkById')
  })

  it('carParkById should correctly construct url', () => {
    const req = occupancy.carParkById(123);
    expect(req.url).to.be.eql(occupancy.URL + '/CarPark/123')
  })

  it('carParkById should add auth', () => {
    const req = occupancy.carParkById(123);
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

})
