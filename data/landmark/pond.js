const config = require('../../config');
const range = require('../../lib/range');
const Landmark = require('../../classes/Landmark');

module.exports = (repo) => {
    repo.add({
        name: 'pond',
        chance: 50,
        onCreate: (instance) => {
            instance.meta.stock = range(0, config.FISHING_POSSIBLE_FISH);
        }
    });
};