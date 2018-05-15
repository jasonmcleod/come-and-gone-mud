module.exports = (repo, state) => ({
    help: (client) => {
        client.log('quit: quit the game');
    },

    execute: (client, str) => {
        state.dataRepository.saveAll();
        const player = client.player;
        client.setContext('quit');
    }
});