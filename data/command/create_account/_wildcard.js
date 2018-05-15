module.exports = (repo, state) => ({
    execute: (client, str) => {
        state.dataRepository.nameExists('account', str, (exists) => {
            if(!exists) {
                client.accountName = str;
                client.log('Enter a password (type cancel to go back)');
                client.setContext('set_password');
            } else {
                client.log('That account name is not available.');
                client.setContext('create_account');
            }
        });
    }
});