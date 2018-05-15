const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({
    
    admin: true,
    help: (client) => {
        client.log('set: set a vital or stat');
    },

    execute: (client, str) => {
        const player = client.player;
        const parts = str.split(' ');
        const group = parts[0];
        const key = parts[1];
        const value = parts[2];
        if(player.hasOwnProperty(group)) {
            if(player[group].hasOwnProperty(key)) {
                client.log(`setting ${key} to ${value}`);
                player[group][key] = value;
            }
        }
    }
});