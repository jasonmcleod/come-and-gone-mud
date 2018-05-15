const logger = require('../lib/logger');
module.exports = (state, client, player) => {

    // wield
    player.area.inventory.add(state.itemRepository.generate({name: 'drill'}));
    state.commandRepository.execute(client, 'take drill');
    state.commandRepository.execute(client, 'equip');
    state.commandRepository.execute(client, 'equip drill');
    state.commandRepository.execute(client, 'equipment');
    state.commandRepository.execute(client, 'unequip');
    state.commandRepository.execute(client, 'unequip 1');
    state.commandRepository.execute(client, 'equip 1');
};