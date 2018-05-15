const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({

    admin:true, 
    help: (client) => {
        client.log('pos: print current coordinates');
    },

    execute: (client, str) => {
        const player = client.player;
        client.log(`Position: ${player.x}, ${player.y}`);
    }
});