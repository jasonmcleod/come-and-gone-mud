const logger = require('../../../lib/logger');

const onFail = (client) => {
    client.log('Error: drop command expects the following format: drop _item name_');
}

module.exports = (repo, state) => ({

    help: (player) => {
        client.log('drop: Drop an item from your inventory.');
        client.log('Usage: "drop piece of paper"');
    },

    execute: (client, str) => {
        const player = client.player;
        if(str.length <= 0) return onFail(client);

        const item = state.itemRepository.resolve(str, player.inventory.items);

        if(item) {
            client.log(`You dropped [${item.fullName()}]`);
            item.equipped = false;
            player.area.inventory.add(item);
            player.inventory.remove(item);
        } else {
            client.log(`You don't seem to have that.`);
        }
    }
});