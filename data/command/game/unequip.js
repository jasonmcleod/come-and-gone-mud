const logger = require('../../../lib/logger');

const onFail = (client) => {
    client.log('Error: unequip command expects the following format: unequip _item name_');
}

module.exports = (repo, state) => ({

    help: (client) => {
        client.log('unequip: item name');
    },

    execute: (client, str) => {
        const item = state.itemRepository.resolve(str, client.player.inventory.items);
        if(!item) return onFail(client);
        if(item.name == 'Bare Hands') {
            client.log('That would hurt a little...');
        } else {
            const currentlyEquipped = client.player.equipment[item.equipment]();
            if(item && item.hasOwnProperty('equipped') && item.equipped && currentlyEquipped == item) {
                client.log(`You unequip ${currentlyEquipped.fullName()}`);
                currentlyEquipped.equipped = false;
            } else {
                client.log('You dont have that equipped.');
            }
        }
    }
});