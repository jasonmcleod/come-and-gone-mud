const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({

    admin:true,

    help: (client) => {
        client.log('truncate: Drop an item from your inventory.');
    },

    execute: (client, str) => {
        state.dataRepository.truncate();
    }
});