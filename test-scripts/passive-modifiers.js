const logger = require('../lib/logger');
module.exports = (state, client, player) => {

    let delta  = 0;
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'high capacity cart'}));
        const previousTotal = player.inventory.capacity();
        state.commandRepository.execute(client, 'take high capacity cart');
        if(player.inventory.capacity() > previousTotal) {
            logger.log('test pass'.green + ' capacity is higher with modifiers.');
        } else {
            logger.log('test fail'.red + ' capacity shoud be higher with modifiers, but is the same.');
        }
    }, delta+=500);
    
};