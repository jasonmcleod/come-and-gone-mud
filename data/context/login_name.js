const config = require('../../config');
module.exports = (repo) => ({
    greet:(client) => {
        client.log(`Type your account name (type cancel to cancel)`);
    }
});