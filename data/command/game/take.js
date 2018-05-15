const logger = require('../../../lib/logger');
const events = require('../../../lib/events');

const isNum = require('../../../lib/isNum');
const onFail = (client) => {
    client.log('Error: give command expects the following format: give _player_ [_count_] _item name_')
}

module.exports = (repo, state) => ({

    alias: ['get'],

    help: (client) => {
        client.log('take: Pickup an item from the area.');
        client.log('Usage: "take piece of paper"');
    },

    execute: (client, str) => {
        const player = client.player;
        if(str.length<=0) return onFail(client);
        const area = state.areaRepository.get(player.x, player.y);
        let item = undefined;

        if(isNum(str)) {
            area.inventory.items.forEach((i, index) => {
                if(str == index+1) item = i;
            });
        } else {
            item = state.itemRepository.resolve(str, area.inventory.items);
        }
    
        if(item) {
            if(player.inventory.add(item)) {
                client.log(`You picked up [${item.fullName()}]`);
                const itemName = item.fullName();
                area.inventory.remove(item);
                events.emit('area_inventory_changed', area, player, itemName);
            } else {
                client.log('Not enough space in inventory');
            }
        } else {
            client.log(`Can't find that here. (${str})`);
        }
    }
});