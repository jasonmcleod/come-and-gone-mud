const config = require('../../config');
module.exports = (repo, state) => ({
    greet:(client) => {
        client.log('Choose a character name');   
    }
});