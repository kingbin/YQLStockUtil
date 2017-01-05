/**
 * Created by crieger on 9/9/16.
 */
var Promise = require('bluebird');


class ExampleEngine {
    /**
     * Can you get an example?
     *
     * @param {number} userID
     */
    canGet(userID){
        return Promise.resolve(userID != 1337);
    }
}

module.exports = new ExampleEngine();