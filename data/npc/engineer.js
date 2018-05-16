const config = require('../../config');
const range = require('../../lib/range');
// todo: no deep merge.. these properties can override the entire mixin!
module.exports = (repo) => {
    repo.add({
        chance: 30,
        aggro: true,
        name: 'crazed engineer',
        goldDrop: 20,
        drops: {
            items: [
                {item: 'pry bar', chance: 20},
                {item: 'drill', chance: 20}
            ],            
            blueprints: [
                { item: 'distress terminal', chance: 10},
                { item: 'generator', chance: 50},
                { item: 'power supply', chance: 70},
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