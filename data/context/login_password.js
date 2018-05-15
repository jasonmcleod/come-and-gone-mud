const config = require('../../config');
module.exports = (repo) => ({
    greet:(client) => {
        client.log(`Type your account password (type cancel to cancel)`);
    }
});