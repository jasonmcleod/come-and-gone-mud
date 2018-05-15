const logger = require('../../../lib/logger');

const onFail = (client) => {
    client.log('Error: place command expects the following format: place _item name_');
}

module.exports = (repo, state) => ({
    
    help: (client) => {
        client.log('place: permanently place an item in this aera');
        client.log('Usage: "place tent"');
    },

    execute: (client, str) => {
        const player = client.player;
        if(str.length<=0) return onFail(client);

        const item = state.itemRepository.resolve(str, player.inventory.items);
        if(item && item.placeable) {
            let out = '';
            client.placeWhat = item; // todo: give context a helper method with storage so I don't have to attach random stuff to it
            client.setContext('place');
            client.log(`Are you sure you want to place [${item.fullName()}] here at position (${player.x}, ${player.y}) ?`);
        } else {
            client.log(`You don't seem to have that.`);
        }
        
    }
});