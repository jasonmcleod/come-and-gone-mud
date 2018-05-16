// every player starts as just a client - they only get a player once they are authenticated and select a character
// code smells: Not using the context-as-stack idea at all

const config = require('../config');
const logger = require('../lib/logger');
const events = require('../lib/events');

class Client {
    constructor(props) {
        // every time we switch contexts, its stored so we can easily rewind; (even though i dont use it)
        this.context = ['pregame'];
        this.webSocket = undefined;
        this.telnetSession = undefined;

        this.accountName = false;
        this.authenticated = false;
    }

    setContext(context) {
        // when going back to main, erase history
        if(context === 'game') this.context.length = 0;
        events.emit('set_context', this, context);
        
        this.context.push(context);
    }

    getContext() {
        return this.context[this.context.length-1];
    }

    log(what) {
        if(this.webSocket) { this.webSocket.emit('newLine', what); }
        if(this.telnetSession) { this.telnetSession.log(what); }
        if(config.REPL_LOG) {

            console.log((this.player ? this.player.name : 'Unknown player'), what);
        }
    }
}

module.exports = Client;