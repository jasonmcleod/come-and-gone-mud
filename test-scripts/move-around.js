const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {

    let delta  = 0;
    let times = 100;
    setTimeout(() => {
        for(let i = 0; i < times; i++) {
            setTimeout(() => {
                console.log(`moving east ${i} / ${times}`);
                state.commandRepository.execute(client, 'e');
                player.vitals.stamina = 100;
            }, i * 500);
        }
    }, delta+=500);
};