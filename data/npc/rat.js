const config = require('../../config');
const range = require('../../lib/range');

module.exports = (repo) => {
    repo.add({
        chance: 80,      
        goldDrop: 1,  
        drops: {
            items: [],
            blueprints: []         
        },
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