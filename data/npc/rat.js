const config = require('../../config');
const range = require('../../lib/range');

module.exports = (repo) => {
    repo.add({
        chance: 100,        
        name: 'rat',
        vitals: {
            healthMax: 20
        }
    });
};