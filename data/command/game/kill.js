const events = require('../../../lib/events');

const onFail = (client) => {
    client.log('Error: kill command expects the name of a player or NPC');
}

module.exports = (repo) => ({

    help: (client) => {
        client.log('kill: enter combat with your target');
    },

    execute: (client, str) => {
        const player = client.player;
        if(str.length<=0) onFail(client);
        const target = player.area.encounters.findNpc(str);
        // if(player.shelter) {
        //     client.log('You cannot fight while inside a shelter');
        // } else {
            if(target) {
                events.emit('enter_combat', client, target);
            } else {
                client.log(`Can't find that`);
            }
        // }
    }
});