module.exports = (repo) => ({
    execute: (client, str) => {
        client.setContext('login_name');
    }
});