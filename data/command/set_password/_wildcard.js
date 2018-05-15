module.exports = (repo, state) => ({
    execute: (client, str) => {
        state.dataRepository.createAccount(client.accountName, str, (results) => {
            client.accountId = results.id;
            client.setContext('create_character_class');
        });
    }
});