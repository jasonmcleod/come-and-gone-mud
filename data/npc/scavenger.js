const config = require('../../config');
const range = require('../../lib/range');
// todo: no deep merge.. these properties can override the entire mixin!
module.exports = (repo) => {
    repo.add({
        chance: 30,        
        name: 'scavenger',
        drop: 20,
        vitals: {
            healthMax: 40
        },
        combat: {
            minAttack: 4,
            maxAttack: 9
        }
    });
};