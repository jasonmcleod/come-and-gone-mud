const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {

    let delta  = 0;
    // add a fishing pole to the area and pick it up
    setTimeout(() => {
        config.override('POSSIBLE_ITEMS', 100);
        state.commandRepository.execute(client, 'look');
        state.commandRepository.execute(client, 's');
    }, delta+=500);

};