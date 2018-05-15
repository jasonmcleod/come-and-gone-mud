const logger = require('../../../lib/logger');

const onFail = (client) => {
    client.log('Error: inspect command expects the following format: inspect _item name_');
}

module.exports = (repo, state) => ({

    help: (player) => {
        client.log('inspect: Inspect an item from your inventory.');
        client.log('Usage: "inspect piece of paper"');
    },

    execute: (client, str) => {
        const player = client.player;
        if(str.length<=0) return onFail(client);

        const item = state.itemRepository.resolve(str, player.inventory.items);
        if(item) {
            // let out = '';
            // if(item.hasOwnProperty('parts')) {
            //     client.log(`[${item.fullName()}] seems to be made up of ${item.parts.length} reusable components`);
            //     item.parts.forEach((p) => {
            //         client.log(`\t${p.fullName()}`)
            //     });
            // } else {
            //     out+= `The [${item.fullName()}] looks like it could be used as a building material.`;
            // }
            client.log(item.inspect || 'No details.');
        } else {
            client.log(`You don't seem to have that.`);
        }
    }
});