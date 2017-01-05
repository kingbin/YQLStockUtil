import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

//import expect from 'unexpected';
var expect = chai.expect;
var assert = chai.assert;

import yqlRA from '/resource-access/yql-ra';

import data from '../../data/sample';

describe('yql-ra.js', function () {
  describe('getStock', function () {
    it('is a function', function () {
      return expect(yqlRA.getStock).to.be.a('function');
    });

    it('getStock init test', function () {
      return expect(yqlRA.getStock(data.symbols)).to.eventually.be.fulfilled;
    });
  });
});
