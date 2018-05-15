const config = require('../../../config');
const chance = require('../../../lib/chance');
const events = require('../../../lib/events');
const Item = require('../../../classes/Item');
module.exports = (repo, state) => ({
    alias: ['n'],
    execute: (client, str) => {
        client.log('placment canceled');
        client.setContext('game');
    }
});



