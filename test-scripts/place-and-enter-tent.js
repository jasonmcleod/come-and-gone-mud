const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {

    let delta  = 0;
    // add a fishing pole to the area and pick it up
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'tent'}));
        state.commandRepository.execute(client, 'look');
        state.commandRepository.execute(client, 'take tent');
        state.commandRepository.execute(client, 'place tent');
        state.commandRepository.execute(client, 'yes');
        state.commandRepository.execute(client, 'look');
        state.commandRepository.execute(client, 'enter tent');
        client.player.vitals.stamina = 50;
        state.commandRepository.execute(client, 'rest');

    }, delta+=500);

};