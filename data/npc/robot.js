const config = require('../../config');
const range = require('../../lib/range');
// todo: no deep merge.. these properties can override the entire mixin!
module.exports = (repo) => {
    repo.add({
        chance: 50,        
        name: 'robot',
        drop: 30,
        vitals: {
            healthMax: 80
        },
        combat: {
            minAttack: 10,
            maxAttack: 18
        }
    });
};