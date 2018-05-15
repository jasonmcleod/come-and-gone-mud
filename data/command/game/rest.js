const logger = require('../../../lib/logger');

module.exports = (repo) => ({

    help: (client, state) => {
        client.log('rest: Rest for a moment.');
        client.log('Usage: "rest');
    },

    execute: (client, str) => {
        const player = client.player;
        if(player.vitals.stamina < 100) {
            player.vitals.rest();
        } else {
            client.log('You do not need to rest.');
        }
    }
});