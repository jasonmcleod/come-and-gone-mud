module.exports = (repo, state) => ({
    execute: (client, str) => {
        state.dataRepository.nameExists('character', str, (exists) => {
            if(!exists) {
                state.dataRepository.createCharacter(str, client.characterClass, client.accountId, (results) => {
                    state.dataRepository.loadCharacter(results.dataValues.id, (instance) => {
                        state.game.join(client, instance);
                    });
                });
            } else {
                client.log('That character name is not available.');
                client.setContext('create_character_name');
            }
        });
    }
});