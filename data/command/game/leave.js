const logger = require('../../../lib/logger');

const onFail = (client) => {
    client.log('Error: enter command expects the following format: enter structure name_');
}

module.exports = (repo, state) => ({
    alias: ['exit'],
    help: (client) => {
        client.log('leave: leave a structure in the area.');
        client.log('Usage: "leave tent"');
    },

    execute: (client, str) => {
        const player = client.player;

        let structure = player.shelter || false;
        
        if(structure) {
            player.shelter = false;
            client.log(`You move out of the protection of the [${structure.name.cyan}]` + '(not implemented)'.red);
        } else {
            client.log(`You are not inside a structure.`);
        }
        
    }
});