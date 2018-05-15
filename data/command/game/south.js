const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({

    alias: ['s'],
    
    help: (client) => {
        client.log('south: move south');
    },

    execute: (client, str) => {
        const player = client.player;
        if(player.moveBy(0, 1)) {
            client.log('Moved south');
        }
    }
});