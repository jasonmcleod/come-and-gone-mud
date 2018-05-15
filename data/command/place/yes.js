const config = require('../../../config');
const chance = require('../../../lib/chance');
const events = require('../../../lib/events');
const Structure = require('../../../classes/Structure');
module.exports = (repo, state) => ({
    alias: ['y'],
    execute: (client, str) => {
        const player = client.player;
        player.inventory.remove(client.placeWhat);
        player.area.encounters.add(new Structure({name: client.placeWhat.name, owner: player.name}));
        client.log(`You placed [${client.placeWhat.fullName()}] at (${player.x}, ${player.y})`);
        client.setContext('game');
    }
});