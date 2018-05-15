const config = require('../../config');
module.exports = (repo, state) => ({
    greet:(client) => {
        client.log(`Select a character or create a new one.`);
        state.dataRepository.getCharacters(client.accountId, (results) => {
            if(results.length) {        
                client.log(`Type a number to select a character:`);
                client.characterList = [''].concat(results);
                results.forEach((c, i) => {
                    client.log(`  ${i+1}) ${c.name}`);
                });
                client.log(`Type "new" to create a new character. (type cancel to go back)`);       
            } else {
                client.setContext('create_character_class');
            }                 
        });
    }
});