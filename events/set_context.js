const config = require('../config');
module.exports = (events, state) => {
    events.on('set_context', (player, context) => {
        const found = state.contextRepository.collection.find((c) => c.name === context);
        if(found && found.hasOwnProperty('greet')) {
            found.greet(player);
        }
    });
};