const config = require('../../config');
module.exports = (repo) => ({
    greet:(client) => {
        client.log(`Are you sure you want to quit? (yes / no)`);
    }
});