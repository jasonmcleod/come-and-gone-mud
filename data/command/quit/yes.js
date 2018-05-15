const logger = require('../../../lib/logger');
module.exports = (repo, state) => ({
    alias: ['y'],
    execute: (client, str) => {
        state.game.leave(client);
    }
});