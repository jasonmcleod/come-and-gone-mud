const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({

    // admin:  true,
    help: (client) => {
        client.log('save: Debug command to persist all data');
    },

    execute: (client, str) => {
        state.dataRepository.saveAll(client);
    }
});