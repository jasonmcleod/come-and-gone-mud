const config = require('../../config');
const range = require('../../lib/range');
// todo: no deep merge.. these properties can override the entire mixin!
module.exports = (repo) => {
    repo.add({
        chance: 20,
        name: 'bandit',
        aggro: true,
        dropGold:  40,
        drops: {
            items: [
                {item: 'pry bar', chance: 50},
                {item: 'axe', chance: 40}
            ],
            blueprints:[]
        },
        vitals: {
            healthMax: 70
        },
        combat: {
            minAttack: 6,
            maxAttack: 12
        }
    });
};