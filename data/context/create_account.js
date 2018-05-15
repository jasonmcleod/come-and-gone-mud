const config = require('../../config');
module.exports = (repo) => ({
    greet:(client) => {
        client.log(`Type an account name (type cancel to go back)`);
    }
});