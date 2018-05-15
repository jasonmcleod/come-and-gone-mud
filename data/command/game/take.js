const logger = require('../../../lib/logger');
const events = require('../../../lib/events');

const isNum = require('../../../lib/isNum');
const onFail = (client) => {
    client.log('Error: give command expects the following format: give _player_ [_count_] _item name_')
}

const executeTake = (client, area, item) => {
    const player = client.player;
    if(player.inventory.add(item)) {
        client.log(`You picked up [${item.fullName()}]`);
        const itemName = item.fullName();
        area.inventory.remove(item);
    } else {
        client.log('Not enough space in inventory');
    }
}

const tellOthers = (client, state, area, name) => {
    const player = client.player;
    
    const playersHere = state.game.getPlayersInArea(area);
    playersHere.forEach((p) => {
        if(p != player) p.client.log(`${player.name} picked up [${name}] from the area.`)
    });
    events.emit('area_inventory_changed', area);
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

        if(str === 'all') {
            area.inventory.items.forEach((i, index) => {
                setTimeout(() => {
                    if(!i.hidden) executeTake(client, area, i);
                }, index * 50);                
            });
            tellOthers(client, state, area, '[all items]')
            return;
        }
        if(isNum(str)) {
            area.inventory.items.forEach((i, index) => {
                if(str == index+1) item = i;
            });
        } else {
            item = state.itemRepository.resolve(str, area.inventory.items);
        }
    
        if(item) {
            executeTake(client, area, item);       
            tellOthers(client, state, area, item.fullName());
            
        } else {
            client.log(`Can't find that here. (${str})`);
        }
    }
});