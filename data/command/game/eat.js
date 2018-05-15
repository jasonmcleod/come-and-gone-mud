const logger = require('../../../lib/logger');

const onFail = (client) => {
    client.log('Error: eat command expects the following format: eat _item name_')
}

module.exports = (repo, state) => ({

    help: (player) => {
        client.log('eat: Eat an item from your inventory.');
        client.log('Usage: "eat apple"');
    },

    execute: (client, str) => {
        const player = client.player;
        // if there are not enough details: fail
        if(str.length<=0) return onFail(client);

        const item = state.itemRepository.resolve(str, player.inventory.items);
        if(item) {
            if(item.type == 'food') {
                client.log(`You ate: ${item.name}`);
                player.vitals.eat();
                player.inventory.remove(item);
            } else {
                client.log('Not something you can eat.');
            }
        } else {
            client.log(`You don't seem to have that.`);
        }
    }
});