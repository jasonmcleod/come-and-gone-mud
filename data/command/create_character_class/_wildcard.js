module.exports = (repo, state) => ({
    execute: (client, str) => {
        // todo: make sure this is a real class
        if(state.classRepository.find(str)) {
            client.characterClass = str;
            client.setContext('create_character_name');
        } else {
            client.log('Not a valid class');
            client.setContext('create_character_class');
        }
    }
});