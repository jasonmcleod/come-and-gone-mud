const events = require('../../../lib/events');
const pad = require('../../../lib/pad');

module.exports = (repo) => ({

    help: (client) => {
        client.log('vitals: check your vitals.')
    },

    execute: (client, str) => {
        const player = client.player;
        client.log('Your vitals:');
        client.log(`Health:                     ${pad(player.vitals.health,3)} / ${player.vitals.healthMax()}`);
        client.log(`Stamina:                    ${pad(player.vitals.stamina,3)} / 100`);
        client.log(`Hunger:                     ${pad(100 - player.vitals.hunger,3)} / 100`);
    }
});
