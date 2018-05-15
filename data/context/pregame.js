const config = require('../../config');
module.exports = (repo) => ({
    greet:(client) => {
        client.log(`Welcome to ${config.GAMENAME}`);
        client.log('Would you like to ' + 'login'.cyan + ' or ' + 'create'.cyan + ' an account?');
        client.log('Type ' + 'login'.cyan + ' or ' + 'create'.cyan + ' to continue.');
    }
});