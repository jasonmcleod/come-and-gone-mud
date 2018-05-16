const logger = require('../lib/logger');
module.exports = (state, client, player) => {
    // player.area.inventory.add(state.itemRepository.generate({name: 'compass'}));
    // state.commandRepository.execute(client, 'look');
    
    player.area.inventory.add(state.itemRepository.generate({name: 'microcontroller'}));
    player.area.inventory.add(state.itemRepository.generate({name: 'axe'}));
    player.area.inventory.add(state.itemRepository.generate({name: 'cd player'}));

    state.commandRepository.execute(client, 'take microcontroller');
    state.commandRepository.execute(client, 'take axe');
    state.commandRepository.execute(client, 'take cd player');

    state.commandRepository.execute(client, 'inspect microcontroller');
    state.commandRepository.execute(client, 'inspect axe');
    state.commandRepository.execute(client, 'inspect cd player');
};