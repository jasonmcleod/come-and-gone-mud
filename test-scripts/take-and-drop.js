const logger = require('../lib/logger');
module.exports = (state, client, player) => {

    let delta  = 0;
    // add a fishing pole to the area and pick it up
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'gear'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wheel'}, {size: 'very large'}));
        state.commandRepository.execute(client, 'look');
        state.commandRepository.execute(client, 'take 1');
        state.commandRepository.execute(client, 'take very large wheel');
        state.commandRepository.execute(client, 'drop 1');
        state.commandRepository.execute(client, 'drop very large wheel');
    }, delta+=500);

};