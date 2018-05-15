module.exports = (repo) => ({
    execute: (client, str) => {
        client.setContext('create_character_class');
    }
});