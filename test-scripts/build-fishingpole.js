const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {

    let delta  = 0;


    
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'fishing pole'}, {blueprint: true}));
        player.area.inventory.add(state.itemRepository.generate({name: 'metal rod'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'metal rod'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'metal rod'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'metal rod'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'metal rod'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'cork'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wire'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wire'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wire'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wire'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wire'}));
        
        state.commandRepository.execute(client, 'take all');

        setTimeout(() => {
            state.commandRepository.execute(client, 'build fishing pole');
            // state.commandRepository.execute(client, 'take very small enclosure');
            // state.commandRepository.execute(client, 'build compass');
        }, 1000);

    }, delta+=500);

};