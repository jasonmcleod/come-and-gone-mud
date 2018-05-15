const config = require('../config');
module.exports = (events) => {
    events.on('tick', (state) => {
        state.game.clients.forEach((client) => {
            if(client.player) {
                const player = client.player;
                const now = Date.now();
                if(now > player.vitals.staminaTick) {
                    if(player.vitals.stamina > 0) {
                        if(player.vitals.hunger > 60) {
                            player.vitals.stamina--;
                        }
                    }
                    player.vitals.staminaTick = now + config.TICK_STAMINA;
                }
            }
        });
    });
};

