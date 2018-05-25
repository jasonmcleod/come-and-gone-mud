const logger = require('../../../lib/logger');

const onFail = (client) => {
    client.log('Error: inspect command expects the following format: inspect _item name_');
}

module.exports = (repo, state) => ({

    help: (client) => {
        client.log('inspect: Inspect an item from your inventory.');
        client.log('Usage: "inspect CD player"');
    },

    execute: (client, str) => {
        const player = client.player;
        if(str.length<=0) return onFail(client);

        const item = state.itemRepository.resolve(str, player.inventory.items);
        if(item) {
            if(item.skill && item.skill <= player.skills.research) {
                client.log(item.inspect || 'No details.');
            } else {
                client.log(item.inspect || 'No details.');
            }            
        } else {
            client.log(`You don't seem to have that.`);
        }
    }
});