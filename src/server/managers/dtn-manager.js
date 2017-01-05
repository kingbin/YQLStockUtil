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
      return yqlRA.getStocks(payload.stockSymbols);
    }
}

module.exports = new DTNManager();
