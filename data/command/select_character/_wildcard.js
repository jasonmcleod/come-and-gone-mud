const config = require('../../../config');

module.exports = (repo, state) => ({
    execute: (client, str) => {
        let selected = false;
        if(!Number.isNaN(str) && str > 0) { // number check
            if(str <= client.characterList.length) {
                state.dataRepository.loadCharacter(client.characterList[str].id, (instance) => {
                    state.game.join(client, instance);
                });
            } else {
                client.log('Invalid character selection');
                setTimeout(()=> {
                    client.setContext('select_character');
                }, config.ERROR_DELAY);
            }
        } else {
            client.log('Invalid character selection2');
        }
    }
});