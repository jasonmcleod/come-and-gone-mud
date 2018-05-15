module.exports = (repo) => ({
    alias: ['cancel', 'n'],
    execute: (player, str) => {
        player.setContext('game');
    }
});