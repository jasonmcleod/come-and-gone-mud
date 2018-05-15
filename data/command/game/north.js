const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({

    alias: ['n'],
    
    help: (client) => {
        client.log('north: move north');
    },

    execute: (client, str) => {
        const player = client.player;
        if(player.moveBy(0, -1)) {
            client.log('Moved north');
        }
    }
});