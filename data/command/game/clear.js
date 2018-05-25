const logger = require('../../../lib/logger');
const chance = require('../../../lib/chance');
const config = require('../../../config');
const events = require('../../../lib/events');
module.exports = (repo, state) => ({
    admin: true,
    help: (client) => {
        client.log('clear: clear your inventory');
    },

    execute: (client, str) => {
        const player = client.player;
        player.area.inventory.items.length = 0;
        client.log('area cleared');
    }
});