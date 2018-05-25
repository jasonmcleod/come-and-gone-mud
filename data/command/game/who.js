const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({

    help: (client) => {
        client.log('who: list all connected players.');
        client.log('Usage: "who"');
    },

    execute: (client, str) => {
        const player = client.player;
        
        const online = [];
        state.game.clients.forEach((c) => {
            if(c.player) {
                online.push(c.player.name);
            }
        })

        if(online.length) {
            client.log(`${online.length} Player${online.length === 1 ? '':'s'} online: ${online.join(', ')}`);
        }
    }
});