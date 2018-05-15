const config = require('../../config');
const range = require('../../lib/range');
// todo: no deep merge.. these properties can override the entire mixin!
module.exports = (repo) => {
    repo.add({
        chance: 20,        
        name: 'bandit',
        drop: 40,
        vitals: {
            healthMax: 70
        },
        combat: {
            minAttack: 6,
            maxAttack: 12
        }
    });
};