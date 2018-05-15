const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({

    help: (player) => {
        client.log('say: Say something to the other players in the game');
        client.log('Usage: "say hello world"');
    },

    execute: (client, str) => {
        const player = client.player;
        if(str.length > 0) 

        state.game.broadcast(`${client.player.name} says ${str}`);        
    }
});