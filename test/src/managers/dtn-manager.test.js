import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

//import expect from 'unexpected';
var expect = chai.expect;
var assert = chai.assert;

import dtnMgr from '/managers/dtn-manager';
import data from '../../data/sample';

describe('dtn-manager.js', function () {
  describe('getStocks', function () {
    it('is a function', function () {
      return expect(dtnMgr.getStocks).to.be.a('function');
    });

    it('getStocks rejected with a bad input', function () {
      var payload = {'stockSymbols': ['AAPEL']};
      return expect(dtnMgr.getStocks(payload)).to.eventually.be.rejected;
    });

    it('getStocks to be fullfilled', function () {
      var payload = {'stockSymbols': data.symbols};
      return expect(dtnMgr.getStocks(payload))
        .to.eventually.deep.equal({ success: true });
      //return assert.isFulfilled(dtnMgr.getStocks({'stockSymbols': 'AAPL'}));
    });

  });
});
