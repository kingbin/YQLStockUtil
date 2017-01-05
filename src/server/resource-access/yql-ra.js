import logger from '../utilities/logger';
import util from 'util';

import Promise from 'bluebird';
import _ from 'lodash';
import rp from 'request-promise';

function yqlURL(symbols){
  logger.debug('symbols => ','"'+symbols.toString().replace(/[^\w\s\.\"]/gi, '","')+'"');

  var s = '"'+symbols.toString().replace(/[^\w\s\.\"]/gi, '","')+'"';

  return 'https://query.yahooapis.com/v1/public/yql?' +
  'q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20'+
  '('+s+')&format=json' +
  '&diagnostics=false&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
}

function extractData(res) {
  var result = [];

  try {
    let body = JSON.parse(res);
    //logger.debug('BODY=> ',util.inspect(body, {colors:true, showHidden:true,depth:null}));
    if(body.query && Array.isArray(body.query.results.quote) ) {
      result = body.query.results.quote;
    }
    else {
      result.push(body.query.results.quote);
    }
  }
  catch(e){
    throw new Error(e);
  }

  var errors = _.takeWhile(result, ['Name',null]);
  if( errors.length > 0 ) {
    throw new Error('Symbol/s Not Found: '+_.map(errors, _.iteratee('symbol')).join(', ') );
  }
  else {
    return result;
  }
}

function handleError (error) {
  let errMsg = error.message || 'Server error';
  logger.error(util.inspect(errMsg, {colors:true, showHidden:true,depth:2}));
  return Promise.reject(errMsg);
}


class YQLRA {
  constructor(){}

  /**
   * Gets a userID
   * @param {string} symbol -the stock symbol to query
   * @returns {*}
   */
  getStock(symbol){
    return this.getStocks(symbol);
  }

  getStocks(symbols) {

    var url = yqlURL(symbols);
    logger.debug('YQL QUERY => ',util.inspect(url, {colors:true, showHidden:true,depth:2}));

    return rp(url)
      .then(extractData)
      .catch(handleError);
  }
}

module.exports = new YQLRA();
