import logger from '../utilities/logger';
import util from 'util';

import yqlRA from '../resource-access/yql-ra';
//import dtnRA from '../resource-access/dtn-ra';

/**
 * @class DTNManager
 */
class DTNManager {
    /**
     * Query stock quotes from YQL service.
     *
     * @method getStocks
     * @param {Object} payload - Payload you pass in.
     * @param {Array} payload.stockSymbols - Array of stock symbols.
     * @example
     * ```
     * dtnManager.getStocks({'stockSymbols':["YHOO","GOOG","AAPL","MSFT"]});
     * @return {external:Promise|Object} A promise of the YQL result or rejected with an errorobject.
     */
    getStocks(payload)
    {
      var symbols = payload.stockSymbols;

      return yqlRA.getStocks(symbols);
//      symbols.forEach(s=> {
//        logger.info('getting Stock: %s',s);
//        yqlRA.getStock(s);
//      });
//
//      return yqlRA.getStock(symbols);
    }
}

module.exports = new DTNManager();
