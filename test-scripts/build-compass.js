const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {

    let delta  = 0;


    
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'compass'}, {blueprint: true}));
        player.area.inventory.add(state.itemRepository.generate({name: 'drill'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'enclosure'}, {size: 'very small'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'magnet'}));
        

        state.commandRepository.execute(client, 'take compass');
        state.commandRepository.execute(client, 'take drill');
        state.commandRepository.execute(client, 'equip drill');

        setTimeout(() => {
            state.commandRepository.execute(client, 'take one-size magnet');
            state.commandRepository.execute(client, 'take very small enclosure');
            state.commandRepository.execute(client, 'build compass');
        }, 1000);

    }, delta+=500);

};