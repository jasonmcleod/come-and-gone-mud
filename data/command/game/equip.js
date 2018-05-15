const logger = require('../../../lib/logger');
const isNum = require('../../../lib/isNum');

module.exports = (repo, state) => ({

    help: (client) => {
        client.log('equip: item name');
    },

    execute: (client, str) => {
        const item = state.itemRepository.resolve(str, client.player.inventory.items);

        if(item) {
            if(item.hasOwnProperty('equipped') && item.equipped) {
                client.log('You already have that equipped.');
            } else {
                // make sure this item can be equipped
                if(item.hasOwnProperty('equipment') && !item.blueprint) {
                    // find whatever may be equipped in this item's slot
                    const currentlyEquipped = client.player.equipment[item.equipment]();
                    if(currentlyEquipped && currentlyEquipped.name != 'bare hands') {
                        client.log(`You unequip ${currentlyEquipped.fullName()}`);
                        currentlyEquipped.equipped = false;
                    }
                    item.equipped = true;
                    client.log(`You equip [${item.fullName()}]`);
                } else {
                    client.log(`Not something you can equip.`);        
                }
            }
        } else {
            client.log(`You don't seem to have that.`);
        }
    }
});