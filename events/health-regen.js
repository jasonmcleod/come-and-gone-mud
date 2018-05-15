const logger = require('../lib/logger');
const config = require('../config');
let nextRegen = 0;
module.exports = (events, state) => {
    events.on('tick', () => {
        const now = Date.now();
        if(now > nextRegen) {            
            state.game.clients.forEach((client) => {
                if(client.player) {
                    const player = client.player;
                    if(player.vitals.health < player.vitals.healthMax) {
                        player.vitals.health+=1;
                    }
                }
            });
            nextRegen = now + config.HEALTH_REGEN_SPEED;
        }
    });
};