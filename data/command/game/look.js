const logger = require('../../../lib/logger');
const chance = require('../../../lib/chance');
const config = require('../../../config');

module.exports = (repo, state) => ({

    alias: ['area'],

    help: (client) => {
        client.log('look: look around the area');
    },

    execute: (client, str) => {
        const player = client.player;
        const area = player.area;

        if(player.inventory.has('compass')) {
            client.log(`By reading your compass, you determine that your position is: ${player.x}, ${player.y}`);
        }

        client.log('You look around the area and find...');

        const players = state.game.getPlayersInArea(area);
        if(players.length > 1) {
            client.log(`${players.length-1} other player${players.length == 2 ? "":"s"}`);
            players.forEach((p) => {
                if(p != player) client.log(`\t${p.name}`);
            });
        } else {
            client.log(`No other players`);
        }
    
        if(area.encounters.npcs.length) {
            client.log(`${area.encounters.npcs.length} npc${area.encounters.npcs.length == 1 ? "":"s"}`);
            area.encounters.npcs.forEach((n) => {
                client.log(`\t${n.fullName()}`);
            });
        } else {
            client.log('No npcs');
        }

        if(area.inventory.items.length) { // todo: bug- if you only have hidden items in an area it will say "0 items" instead of "no items"
            let visibleItems = 0;
            area.inventory.items.forEach((i) => { visibleItems+= i.hidden ? 0:1; } );
            client.log(`${visibleItems} item${visibleItems == 1 ? "":"s"}`);
            area.inventory.asList(client, chance(client.player.skills.totalDetection()));
        } else {
            client.log('No items');
        }
    
        if(area.encounters.structures.length) {
            client.log(`${area.encounters.structures.length} structure${area.encounters.structures.length == 1 ? "":"s"}`);
            area.encounters.structures.forEach((n) => {
                client.log(`\t${n.fullName()}`);
            });
        } else {
            client.log('No structures');
        }
    
        if(area.encounters.landmarks.length) {
            client.log(`${area.encounters.landmarks.length} landmark${area.encounters.landmarks.length == 1 ? "":"s"}`);
            area.encounters.landmarks.forEach((n) => {
                client.log(`\t${n.fullName()}`);
            });
        } else {
            client.log('No landmarks');
        }
        client.log('----------------------------------------------------------------------');
    }
});

