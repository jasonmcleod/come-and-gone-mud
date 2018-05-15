module.exports = (rep, state) => ({
    execute: (client, str) => {
        state.dataRepository.nameExists('account', str, (exists) => {
            if(exists) {
                client.accountName = str;
                client.setContext('login_password');        
            } else {
                client.log('Could not find an account by that name');
                client.setContext('login_name');
            }
        });
    }
});