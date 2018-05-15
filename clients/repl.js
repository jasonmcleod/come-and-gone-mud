// repl client to serve developer
const repl = require('repl');

module.exports = (state, client) => {

    var replServer = repl.start({
        // prompt: client.prompt.value,
        eval: (input) => {
            state.commandRepository.execute(client, input.trim(), state);
        }
    });
};