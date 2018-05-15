const config = require('../../config');
const range = require('../../lib/range');
// todo: no deep merge.. these properties can override the entire mixin!
module.exports = (repo) => {
    repo.add({
        chance: 40,        
        name: 'wolf',
        drop: 5,
        vitals: {
            healthMax: 30
        },
        combat: {
            minAttack: 8,
            maxAttack: 12
        }
    });
};