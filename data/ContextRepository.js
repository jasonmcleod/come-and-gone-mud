// does not extend Repository...

const fs = require('fs');
const Context = require('../classes/Context');
const Repository = require('./Repository');
const logger = require('../lib/logger');

class ContextRepository {
    constructor(state) {
        this.state = state;
        this.collection = [];
    }

    add(props) {
        logger.log('loaded context:', props.name);
        const instance = new Context(props);
        this.collection.push(instance);
    }

    load() {
        fs.readdirSync(`./data/context`).forEach(f => {
            let name = f.replace('.js','');
            let context = require(`../data/context/${name}`)(this, this.state);
            context.name = name;
            this.add(context);
        });
    }
}

module.exports = ContextRepository;