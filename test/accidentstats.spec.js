import { expect } from 'chai';
import AccidentStats from '../src/accidentstats';


describe('Accident Stats', () => {

  const appId = '12345';
  const appKey = 'abcdef';
  const accidentstats = AccidentStats(appId, appKey);

  it('should expose itself as a function', () => {
    expect(AccidentStats).to.be.function;
  })

  it('should be a function to query accidentstats when bound to appId and key', () => {
    expect(accidentstats).to.be.function;
  })

  it('should append year to the url', () => {
    const req = accidentstats(2016);
    expect(req.url).to.be.eql(accidentstats.URL + '2016')
  })

  it('should pass through authentication details', () => {
    const req = accidentstats(2016);
    expect(req.qs).to.have.property('app_id', appId);
    expect(req.qs).to.have.property('app_key', appKey);
  })

})
