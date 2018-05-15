const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({

    alias: ['w'],
    
    help: (client) => {
        client.log('west: move west');
    },

    execute: (client, str) => {
        const player = client.player;
        if(player.moveBy(1, 0)) {
            client.log('Moved west');
        }
    }
});