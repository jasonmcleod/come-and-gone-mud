const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {

    let delta  = 0;
    // add a fishing pole to the area and pick it up
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'fishing pole'}));
        state.commandRepository.execute(client, 'look');
        state.commandRepository.execute(client, 'take fishing pole');
        state.commandRepository.execute(client, 'dismantle fishing pole');
        state.commandRepository.execute(client, 'yes');

        player.skills.assembly = 95;

        player.area.inventory.add(state.itemRepository.generate({name: 'fishing pole'}));
        state.commandRepository.execute(client, 'look');
        state.commandRepository.execute(client, 'take fishing pole');
        state.commandRepository.execute(client, 'dismantle fishing pole');
        state.commandRepository.execute(client, 'yes');
    }, delta+=500);

};