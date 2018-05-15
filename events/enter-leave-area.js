const Client = require('../classes/Client');

module.exports = (events, state) => {

    const tellOthers = (action, client, x, y) => {
        const player = client.player;
        const players = state.game.getPlayersInArea({x, y});
        if(players.length>1) {
            players.forEach((p) => {
                if(p!=player) {
                    p.client.log(`${player.name} ${action} the area.`);
                }
            });
        }
    };

    events.on('player_entered_area', (client, x, y) => { 
        tellOthers('entered', client, x, y);
    });

    events.on('player_left_area', (client, x, y) => {
        tellOthers('left', client, x, y);
    });
    
};
