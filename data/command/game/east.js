const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({

    alias: ['e'],
    
    help: (client) => {
        client.log('east: move east');
    },

    execute: (client, str) => {
        const player = client.player;
        if(player.moveBy(-1, 0)) {
            client.log('Moved east');
        }
    }
});