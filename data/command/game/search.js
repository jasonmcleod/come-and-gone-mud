const logger = require('../../../lib/logger');
module.exports = (repo, state) => ({

    help: (client) => {
        client.log('search: Search the area for useful items.');
        client.log('Usage: "search"');
    },

    execute: (client, str) => {
        const player = client.player;
        if(!player.area.inventory.items.length) {
            client.log('Nothing interesting.');
        } else {
            client.log('In the area: ');
            player.area.inventory.asList(client);
        }
    }
});