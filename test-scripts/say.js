const logger = require('../lib/logger');
module.exports = (state, client, player) => {
    state.commandRepository.execute(client, 'say hi');
};