const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({

    alias: ['commands'],

    help: (client) => {
        client.log('redundant');
    },

    execute: (client, str) => {
        const player = client.player;
        if(str.length===0) {
            const list = [];
            state.commandRepository.collection[client.getContext()].forEach((c) => {
                if(c.hasOwnProperty('alias')) {
                    let aliasList = [];
                    state.commandRepository.collection[client.getContext()].forEach((a) => {
                        if(a.aliasOf == c.name) {
                            aliasList.push(a.name);
                        }
                    });
                    list.push(`${c.name} (alias: ${aliasList.join(', ')})`);
                } else {
                    if(!c.hasOwnProperty('aliasOf')) {
                        list.push(c.name);
                    }
                }
            });
            client.log('Commands:');
            list.sort().forEach((command) => {
                client.log(`\t${command}`);
            });
        } else {
            const found = state.commandRepository.collection[client.getContext()].find((c) => c.name == str);
            if(found) {
                found.help(client);
            }
        }
    }
});