import { expect } from 'chai';
import tfl from '../src/';


describe('tfl.api entry', () => {

  const appId = '12345';
  const appKey = 'password'
  const instance = tfl(appId, appKey);

  it('should expose itself as a function', () => {
    expect(tfl).to.be.function
  })

  it('should accept appId and appKey as arguments', () => {
    expect(instance).to.be.ok;
  })

  it('should expose the tfl search package', () => {
    expect(instance).to.have.key('search');
  })

})
