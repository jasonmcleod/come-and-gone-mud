const range = require('../lib/range');
const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {

    for(let i = 0; i< 100; i++) {
        console.log(range(0, 100));
    }

};