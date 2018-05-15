const config = require('../config');
module.exports = (events) => {
    events.on('tick', (state) => {
        state.game.clients.forEach((client) => {
            if(client.player) {
                const player = client.player;
                const now = Date.now();
                if(now > player.vitals.hungerTick) {
                    player.vitals.hunger = Math.max(player.vitals.hunger-1, 0);
                    player.vitals.hungerTick = now + config.TICK_HUNGER;
                    if(player.vitals.hunger>=100) {
                        player.vitals.stamina = Math.max(player.vitals.stamina-1, 0);
                    }
                }
            }
        });
    });
};

