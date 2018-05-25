const logger = require('../../../lib/logger');
const chance = require('../../../lib/chance');
const events = require('../../../lib/events');

const onFail = (client) => {
    client.log('Error: dismantle command expects the following format: dismantle _item name_');
}

module.exports = (repo, state) => ({

    alias: ['dismantle'],

    help: (client) => {
        client.log('dismantle: Dismantle an item from your inventory.');
        client.log('Usage: "dismantle piece of paper"');
    },

    execute: (client, str) => {
        const player = client.player;
        // if there are not enough details: fail
        if(str.length<=0) return onFail(client);

        const item = state.itemRepository.resolve(str, player.inventory.items);
        if(item) {
            if(item.hasOwnProperty('parts') && !item.blueprint) {
                client.workbench = item;
                // client.log(`You have all the required parts to build [${item.fullName()}]`);
                client.log(`Would you like to attempt to dismantle [${item.fullName()}] using your [${player.tool().fullName()}] ?`);
                client.setContext('dismantle');
            } else {
                client.log(`Not something you can dismantle.`)
            }
        } else {
            client.log(`You don't seem to have that.`);
        }
    }
});