// telnet client to support telnet users
const config = require('../config');

const blessed = require('blessed');
const telnet = require('telnet2');
module.exports = (state) => {

    telnet({ tty: true }, function(telnetClient) {

        telnetClient.on('term', function(terminal) {
            screen.terminal = terminal;
            screen.render();
        });

        telnetClient.on('size', function(width, height) {
            telnetClient.columns = width;
            telnetClient.rows = height;
            telnetClient.emit('resize');
        });

        const screen = blessed.screen({
            smartCSR: true,
            input: telnetClient,
            output: telnetClient,
            terminal: 'xterm-256color',
            fullUnicode: true
        });

        telnetClient.on('close', function() {
            state.game.leave(client);
            if (!screen.destroyed) {
                screen.destroy();
            }
        });

        screen.key(['C-c', 'q'], function(ch, key) {
            state.game.leave(client);
            screen.destroy();
        });

        screen.on('destroy', function() {
            state.game.leave(client);
            if (telnetClient.writable) {                
                telnetClient.destroy();
            }
        });

        const output = blessed.box({
            parent: screen,
            tags: true,
            height: '80%',
            width: '100%',
            left: 0,
            padding: 2,
            top:1,
            style:{
                bg:'black',
                border:{
                    bg:'black',
                    ch: ' ',
                }
            },
            scrollable: true,
            alwaysScroll: true
        });

        const commandPrompt = blessed.textbox({
            parent: screen,
            inputOnFocus: true,
            height: '10%',
            width: '100%',
            top: '90%',
            left: 2,
            tags: true,
            keys: true,
            hidden: true
        }); 

        commandPrompt.show();
        commandPrompt.focus();

        commandPrompt.on('submit', (value) => {
            state.commandRepository.execute(client, value.toString().trim(), state);
            commandPrompt.clearValue();
            commandPrompt.focus();
            screen.render();
        });

        const history = [];

        const client = state.game.connect();
        client.telnetClient = telnetClient;
        client.telnetoutput = output;
        client.telnetSession = {
            quit: () => {
                screen.destroy();
                telnetClient.destroy();
            },
            log: (what) => {
                history.push(what);
                if(history.length === telnetClient.rows-10) {
                    history.shift();
                }
                output.setContent(history.join('\n'));
                screen.render();
            }
        }
        client.setContext('pregame');

        screen.render();
    }).listen(config.TELNET_PORT);

};