const config = require('../../../config');
const chance = require('../../../lib/chance');
const events = require('../../../lib/events');
const Item = require('../../../classes/Item');
module.exports = (repo, state) => ({
    alias: ['y'],
    execute: (client, str) => {
        client.log(`building ${client.workbench.fullName()}`);
        client.workbench.parts.forEach((p) => {
            client.player.inventory.remove(p);
        });
        if(client.player.skills.totalAssembly() >= client.workbench.assemblyChance - range(0, client.player.skills.research)) {                
            client.log(`You ` + 'successfully built'.green + ` [${client.workbench.fullName()}]`);
            events.emit('skill_up', client, 'research', config.BUILD_ATEMPT_BOOST);
            client.workbench.blueprint = false;
        } else {
            client.log(`You ` + 'failed'.red + ` to build [${client.workbench.fullName()}]`);
        }
        events.emit('skill_up', client, 'research', config.BUILD_SUCCEED_BOOST);
        if(client.player.inventory.has('piece of paper') && client.player.inventory.has('pencil')) {
            client.log('You make notes on a piece of paper (+1 research)');
            events.emit('skill_up', client, 'research', 1);    
        }
        events.emit('skill_up', client, 'research', config.BUILD_SUCCEED_BOOST);
        client.setContext('game');
    }
});