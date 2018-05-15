const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({

    alias: ['list', 'items', 'i'],
    
    help: (client) => {
        client.log('inventory: Review the contents of your inventory.');
        client.log('Usage: "inventory"');
    },

    execute: (client, str) => {
        const player = client.player;
        if(!player.inventory.items.length) {
            client.log(`Your inventory: ${player.inventory.totalWeight()} / ${player.inventory.capacity()}`);
            client.log('Nothing...');
        } else {
            client.log(`Your inventory: ${player.inventory.totalWeight()} / ${player.inventory.capacity()}`);
            player.inventory.asList(client);
        }
    }
});