import { expect } from 'chai';
import search from '../src/search';


describe('TFL Search', () => {

  it('should expose a default search method', () => {
    expect(search).to.be.ok;
  })

  it('should expose busSchedules method', () => {
    expect(search.busSchedules).to.be.ok;
  })

  it('should expose meta method', () => {
    expect(search.meta).to.be.ok;
  })

  describe('search method', () => {

    it('should pass through all options', () => {
      const qs = {
        query: 'Thameslink',
        pageSize: 5,
        pageFrom: 2
      }
      const req = search(qs)
      expect(search(qs).qs).to.be.eql(qs);
    })

  })

})
