const logger = require('../../../lib/logger');
const pad = require('../../../lib/pad');

module.exports = (repo, state) => ({

    alias: ['character', 'skills', 'stats', 'vitals', 'info'],
    
    help: (client) => {
        client.log('east: move east');
    },

    execute: (client, str) => {
        const player = client.player;
        client.log(`${player.name} details`);
        client.log('Your vitals--------------------');
        client.log(`Health:                     ${pad(player.vitals.health,3)} / ${player.vitals.healthMax}`);
        client.log(`Stamina:                    ${pad(player.vitals.stamina,3)} / 100`);
        client.log(`Hunger:                     ${pad(100 - player.vitals.hunger,3)} / 100`);

        client.log('Your stats/skills---------------');
        client.log(`Assembly/ Dissasembly:      ${pad(~~(player.skills.assembly), 3)} / 100 (+ ${player.skills.totalAssembly() - player.skills.assembly})`);
        client.log(`Detection:                  ${pad(~~(player.skills.detection), 3)} / 100 (+ ${player.skills.totalDetection() - player.skills.detection})`);
        client.log(`Research:                   ${pad(~~(player.skills.research), 3)} / 100 (+ ${player.skills.totalResearch() - player.skills.research})`);

        client.log('Your equipment and inventory-----');
        client.log(`Hand:                       ${client.player.equipment.wield().fullName()}`);
        client.log(`Head:                       ${client.player.equipment.helmet().fullName()}`);
        client.log(`Armor:                      ${client.player.equipment.armor().fullName()}`);
        client.log(`Gold:                       ${player.gold}`);
        client.log(`Type "items" to see  your inventory`);

    }
});