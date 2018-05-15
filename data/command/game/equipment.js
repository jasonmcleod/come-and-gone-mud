const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({

    alias: ['equipped'],
    
    help: (client) => {
        client.log('equipment: see what is equipped');
    },

    execute: (client, str) => {
        client.log(`Hand: ${client.player.equipment.wield().fullName()}`);
        client.log(`Head: ${client.player.equipment.helmet().fullName()}`);
        client.log(`Armor: ${client.player.equipment.armor().fullName()}`);
    }
});