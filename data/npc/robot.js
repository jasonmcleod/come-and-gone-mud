const config = require('../../config');
const range = require('../../lib/range');
// todo: no deep merge.. these properties can override the entire mixin!
module.exports = (repo) => {
    repo.add({
        chance: 50,
        name: 'robot',
        goldDrop: 30,
        drops: {
            items: [
                {item: 'resistor', chance: 50},
                {item: 'capacitor', chance: 70},
                {item: 'microcontroller', chance: 60},
                {item: 'battery', chance: 80},
                {item: 'speaker', chance: 60},
                {item: 'circuit board', chance: 30},
                {item: 'blinking light', chance: 30}
            ],
            blueprints: [
                { item: 'generator', chance: 10}
            ]
        },
        vitals: {
            healthMax: 80
        },
        combat: {
            minAttack: 10,
            maxAttack: 18
        }
    });
};