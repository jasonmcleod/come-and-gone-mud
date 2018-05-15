const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {

    let delta  = 0;
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'piece of paper'}, {size: 'small' }));
        player.area.inventory.add(state.itemRepository.generate({name: 'pencil'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'fishing pole'}));
        state.commandRepository.execute(client, 'take small piece of paper');
        state.commandRepository.execute(client, 'take pencil');
        state.commandRepository.execute(client, 'take fishing pole');
        logger.log(player.inventory.has('pencil') ? 'yep':'nope');
        logger.log(player.inventory.has('piece of paper') ? 'yep':'nope');
        state.commandRepository.execute(client, 'dismantle fishing pole');
        state.commandRepository.execute(client, 'yes');
    }, delta+=500);

};