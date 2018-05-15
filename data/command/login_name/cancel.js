const events = require('../../../lib/events');

module.exports = (repo) => ({
    execute: (client, str) => {
        client.setContext('pregame');
    }
});