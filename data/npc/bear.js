const config = require('../../config');
const range = require('../../lib/range');
// todo: no deep merge.. these properties can override the entire mixin!
module.exports = (repo) => {
    repo.add({
        chance: 10,        
        name: 'bear',
        drop: 10,
        vitals: {
            healthMax: 50
        },
        combat: {
            minAttack: 9,
            maxAttack: 14
        }
    });
};