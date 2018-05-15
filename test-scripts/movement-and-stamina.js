const logger = require('../lib/logger');
module.exports = (state, client, player) => {

    let delta  = 0;
    setTimeout(() => {
        state.commandRepository.execute(client, 'east');
        state.commandRepository.execute(client, 'west');
        player.vitals.stamina = 0;
        state.commandRepository.execute(client, 'east');
        state.commandRepository.execute(client, 'rest');
        player.vitals.stamina = 100;
        setTimeout(() => {
            state.commandRepository.execute(client, 'east');
            state.commandRepository.execute(client, 'west');
        }, 3000);
    }, delta+=500);

};