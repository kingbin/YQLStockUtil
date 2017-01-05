// -----------------------------------------------------------------------------------------------------------
// Main server module
//
// @module
// -----------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------

import program from 'commander';

import logger from './server/utilities/logger';
import util from 'util';

import dtnMgr from './server/managers/dtn-manager';

logger.info('ARMtech DTN Service');

function list(val) {
  return val.split(',');
}

//node server.js -s 'GOOG','YHOO','AAPL','MSFT'

program
  .arguments('')
  .option('-s, --stocks <value>', 'Comma seperated list of stocks to query', list)
  .option('-u, --user <webUserName>', 'Particular user to query')
  .option('-a, --all', 'List of all users signed up for commodity alerts')
  .option('-S, --send', 'Send Text Alerts')
  .parse(process.argv);


  if(program.stocks) {
    dtnMgr.getStocks({'stockSymbols':program.stocks}).then(stocks=>{
      logger.debug('SERVER RES=> ',util.inspect(stocks, {colors:true, showHidden:true,depth:null}));
    });
  }
