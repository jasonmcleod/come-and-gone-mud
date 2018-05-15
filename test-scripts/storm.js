const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {

    let delta  = 0;
    
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'football helmet'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'sturdy armor'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'small fort'}));
    
        state.commandRepository.execute(client, 'take football helmet');
        state.commandRepository.execute(client, 'take sturdy armor');
        // state.commandRepository.execute(client, 'equip football helmet');
        // state.commandRepository.execute(client, 'equip sturdy armor');
        state.commandRepository.execute(client, 'take small fort');
        // state.commandRepository.execute(client, 'place small fort');
        // state.commandRepository.execute(client, 'yes');
        player.area.inventory.items.length = 0;
        // state.commandRepository.execute(client, 'enter small fort');
    }, delta+=500);

};