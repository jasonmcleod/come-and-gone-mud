const config = require('../../config');
module.exports = (repo, state) => ({
    greet:(client) => {
        client.log('Choose a character class');
        state.classRepository.collection.forEach((c) => {
            client.log(c.name);
            // codesmell.. this damn 'obj' thing
            client.log(`\t${c.obj.data.description}`);
            client.log(`\tStaring items: ${c.obj.data.startingItems.join(', ')}`);
        });
    }
});