const Client = require('../classes/Client');
module.exports = (events) => {
    events.on('enter_combat', (client, target) => {
        if(client instanceof Client) {
            client.log(`You are entering combat with ${target.fullName()}`);
        }
    });
};