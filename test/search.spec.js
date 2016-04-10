import { expect } from 'chai';
import Search from '../src/search';


describe('TFL Search', () => {

  const appId = '12345';
  const appKey = 'abcdef';
  const search = Search(appId, appKey);

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

    it('should pass through all options as well as auth', () => {
      const qs = {
        query: 'Thameslink',
        pageSize: 5,
        pageFrom: 2
      }
      const req = search(qs)
      expect(req.qs).to.have.property('query', 'Thameslink');
      expect(req.qs).to.have.property('pageSize', 5);
      expect(req.qs).to.have.property('pageFrom', 2);
      expect(req.qs).to.have.property('app_id', appId);
      expect(req.qs).to.have.property('app_key', appKey);
    })

  })



})
