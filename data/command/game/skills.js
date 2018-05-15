const events = require('../../../lib/events');
const pad = require('../../../lib/pad');

module.exports = (repo) => ({

    alias: ['stats'],

    help: (client) => {
        client.log('stats: check your stats.')
    },

    execute: (client, str) => {
        const player = client.player;
        client.log('Your stats/skills:');
        client.log(`Assembly/ Dissasembly:      ${pad(~~(player.skills.assembly), 3)} / 100 (+ ${player.skills.totalAssembly() - player.skills.assembly})`);
        client.log(`Detection:                  ${pad(~~(player.skills.detection), 3)} / 100 (+ ${player.skills.totalDetection() - player.skills.detection})`);
        // client.log(`Substitution:               ${pad(~~(player.skills.substitution), 3)} / 100 (+ ${player.skills.totalSubstitution() - player.skills.substitution})`);
        client.log(`Research:                   ${pad(~~(player.skills.research), 3)} / 100 (+ ${player.skills.totalResearch() - player.skills.research})`);
    }
});
