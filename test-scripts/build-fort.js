const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {

    let delta  = 0;
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'small fort'}, {blueprint: true}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wood'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wood'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wood'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wood'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wood'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wood'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wood'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wood'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wood'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wood'}));

        state.commandRepository.execute(client, 'take small fort');
        state.commandRepository.execute(client, 'take wood');
        state.commandRepository.execute(client, 'take wood');
        state.commandRepository.execute(client, 'take wood');
        state.commandRepository.execute(client, 'take wood');
        state.commandRepository.execute(client, 'take wood');
        state.commandRepository.execute(client, 'take wood');
        state.commandRepository.execute(client, 'take wood');
        state.commandRepository.execute(client, 'take wood');
        state.commandRepository.execute(client, 'take wood');
        state.commandRepository.execute(client, 'take wood');

        state.commandRepository.execute(client, 'build small fort');
        
        
    }, delta+=500);

};