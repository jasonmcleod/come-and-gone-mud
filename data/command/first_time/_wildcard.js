module.exports = (repo) => ({    
    execute: (client, str) => {
        client.setContext('game');
    }
});