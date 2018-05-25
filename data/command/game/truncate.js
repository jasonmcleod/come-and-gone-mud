const logger = require('../../../lib/logger');

module.exports = (repo, state) => ({

    admin:true,

    help: (client) => {
        client.log('truncate: truncate the database.');
    },

    execute: (client, str) => {
        state.dataRepository.truncate();
    }
});