module.exports = (rep, state) => ({
    execute: (client, str) => {       
        state.dataRepository.auth(client.accountName, str, (results) => {
            if(results.success) {
                client.accountId = results.account;
                client.setContext('select_character');
            } else {
                client.log('Incorrect password');
            }
        });        
    }
});