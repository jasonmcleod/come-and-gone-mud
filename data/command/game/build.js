const colors = require('colors');
const isNum = require('../../../lib/isNum');
const logger = require('../../../lib/logger');
const chance = require('../../../lib/chance');
const events = require('../../../lib/events');
const Item = require('../../../classes/Item');

const onFail = (player) => {
    client.log('Error: build command expects the following format: build _blueprint item name_');
}

module.exports = (repo, state) => ({

    alias: ['assemble'],

    help: (player) => {
        client.log('build: Build an item from a blueprint in your inventory.');
        client.log('Usage: "dismantle piece of paper"');
    },

    execute: (client, str) => {
        const player = client.player;

        if(str.length<=0) return onFail(player);

        let item = false;
        if(isNum(str)) {
            player.inventory.items.forEach((i, index) => {
                if(str == index+1) item = i;
            });
        } else {
            item = state.itemRepository.resolve(str, player.inventory.items);
        }

        if(item) {
            if(item.blueprint) {
                // walk the parts and make sure they are Item instances - this way we can lock in the requirements.
                item.parts = item.parts.map((p) => {
                    return p.generated ? p: state.itemRepository.generate(p, p) // find with base name, then put the exact attributes on if they are set
                });
                client.log('The build requires the following parts:');
                let needed = item.parts.length;
                item.parts.forEach((p) => {
                    const hasItem = player.inventory.has(p, chance(player.skills.substitution));
                    const flag = hasItem ? '✔'.green : 'X'.red;
                    if(hasItem) needed--;
                    client.log(`\t${flag} ${p.fullName()}`);
                });
                if(needed==0) {
                    client.log(`You have all the required parts to build [${item.fullName()}]`);
                    client.log(`Would you like to attempt to build it using your [${player.tool().fullName()}] ?`);
                    // codesmell: I need a contextData object...
                    client.workbench = item;
                    client.setContext('build');
                } else {
                    client.log(`You do not have all the required parts to build [${item.fullName()}]`);
                }
            } else {
                client.log(`Not something you can build.`)
            }
        } else {
            client.log(`You don't seem to have a ${str} blueprint.`);
        }
    }
});