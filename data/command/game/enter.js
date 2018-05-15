const logger = require('../../../lib/logger');

const onFail = (client) => {
    client.log('Error: enter command expects the following format: enter structure name_');
}

module.exports = (repo, state) => ({
    
    help: (client) => {
        client.log('enter: enter into a structure in the area.');
        client.log('Usage: "enter tent"');
    },

    execute: (client, str) => {
        const player = client.player;
        if(str.length<=0) return onFail(client);

        const structure = player.area.encounters.findStructure(str);
        if(structure) {
            player.shelter = structure;
            client.log(`You move into the protection of [${structure.fullName().cyan}]`);
        }
        
    }
});