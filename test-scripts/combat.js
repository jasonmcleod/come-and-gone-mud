const logger = require('../lib/logger');
module.exports = (state, client, player) => {

    let delta  = 0;
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'axe'}));
        state.commandRepository.execute(client, 'take axe');
        state.commandRepository.execute(client, 'equip axe');
    }, delta+=500);

};