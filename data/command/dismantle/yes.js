const config = require('../../../config');
const chance = require('../../../lib/chance');
const events = require('../../../lib/events');
const Item = require('../../../classes/Item');
module.exports = (repo, state) => ({
    alias: ['y'],
    execute: (client, str) => {
        const player = client.player;
        const item = client.workbench;
        const tool = player.tool();
        client.log(`You begin to dismantle the [${item.fullName()}] using your ${tool.fullName()}`);
        item.parts.forEach((p) => {                                        
            let part = state.itemRepository.generate(p, p);
            if(player.skills.totalAssembly() >= item.skill - range(0, player.skills.research)) {
                player.inventory.add(part);
                client.log(`You ` + 'successfully'.green + ` salvage a ${part.fullName()} from the [${item.fullName()}]!`)
            } else {
                client.log(`You ` + 'fail'.red + ` to salvage the [${part.fullName()}] from the [${item.fullName()}]`);
            }
            events.emit('skill_up', client, 'assembly', 2);
            events.emit('skill_up', client, 'research', 1);
            if(client.player.inventory.has('piece of paper') && client.player.inventory.has('pencil')) {
                client.log('You make notes on a piece of paper (+1 research)');
                events.emit('skill_up', client, 'research', 1);    
            }
            client.setContext('game');
        });
        client.player.record({action: 'dismantle', item});
        player.inventory.remove(item);
    }
});



