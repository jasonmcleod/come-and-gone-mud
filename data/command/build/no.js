module.exports = (repo, state) => ({
    alias:['n', 'cancel'],
    execute: (client, str) => {
        client.setContext('game');
    }
});