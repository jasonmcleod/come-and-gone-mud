const logger = require('../lib/logger');
module.exports = (state, client, player) => {

    let delta  = 0;
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'apple'}));
        state.commandRepository.execute(client, 'take apple');
        state.commandRepository.execute(client, 'eat apple');
    }, delta+=500);

};