import { expect } from 'chai';
import Tfl from '../src/';


describe('tfl.api entry', () => {

  const appId = '12345';
  const appKey = 'password'
  const tfl = Tfl(appId, appKey);

  it('should expose itself as a function', () => {
    expect(tfl).to.be.function
  })

  it('should accept appId and appKey as arguments', () => {
    expect(tfl).to.be.ok;
  })

  it('should expose the tfl search package', () => {
    expect(tfl).to.have.property('search');
  })

  it('should expose the tfl accidentstats package', () => {
    expect(tfl).to.have.property('accidentstats');
  })

  it('should expose the tfl place package', () => {
    expect(tfl).to.have.property('place');
  })

  it('should expose the tfl occupancy package', () => {
    expect(tfl).to.have.property('occupancy');
  })

  it('should expose the tfl journey package', () => {
    expect(tfl).to.have.property('journey');
  })

  it('should expose the tfl stoppoint package', () => {
    expect(tfl).to.have.property('stoppoint');
  })

})
