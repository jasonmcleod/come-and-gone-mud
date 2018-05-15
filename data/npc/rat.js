const config = require('../../config');
const range = require('../../lib/range');

module.exports = (repo) => {
    repo.add({
        chance: 80,      
        drop: 1,  
        name: 'rat',
        vitals: {
            healthMax: 20
        },
        combat: {
            minAttack: 1,
            maxAttack: 5
        }
    });
};