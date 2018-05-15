// move to repository?
const EventEmitter = require('events');
const fs = require('fs');
const config = require('../config');
const logger = require('../lib/logger');

class Events extends EventEmitter {

    constructor() {
        super();
        this.state = null;
    }

    init(state) {
        this.state = state;
        
        fs.readdirSync('./events').forEach(f => {
            const file = f.split('.');
            if(file.length === 2) {
                const name = file[0];
                require(`../events/${name}`)(this, this.state);
                logger.log('loaded event:', name);
            } else {
                logger.error('Error loading event:', f);
            }
        });

        setInterval(() => {
            this.emit('tick', state);
        }, config.TICK_RATE);
    }
}

module.exports = new Events();