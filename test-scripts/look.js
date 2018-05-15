const logger = require('../lib/logger');
module.exports = (state, client, player) => {
    state.commandRepository.execute(client, 'look');
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'compass'}));
        state.commandRepository.execute(client, 'take compass');
        state.commandRepository.execute(client, 'look');
    },1000);
};