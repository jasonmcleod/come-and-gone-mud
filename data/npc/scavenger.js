const config = require('../../config');
const range = require('../../lib/range');
// todo: no deep merge.. these properties can override the entire mixin!
module.exports = (repo) => {
    repo.add({
        chance: 30,
        aggro: true,        
        name: 'crazed scavenger',
        goldDrop: 20,
        drops: {
            items: [
                { item: 'pry bar', chance: 20 },
                { item: 'axe', chance: 20 },
                { item: 'compass', chance: 80 }
            ],
            blueprints: [
                { item: 'distress terminal', chance: 10},
                { item: 'metal detector', chance: 30},
            ]       
        },
        vitals: {
            healthMax: 40
        },
        combat: {
            minAttack: 4,
            maxAttack: 9
        }
    });
};