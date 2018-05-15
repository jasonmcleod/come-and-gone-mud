const config = require('../config');
const logger = require('../lib/logger');
const Npc = require('../classes/Npc');
const Repository = require('./Repository');

class NpcRepository extends Repository {
    constructor(state) {
        super(state);
        this.type = 'npc';
    }

    add(props) {
        logger.log('loaded npc:', props.name);
        const instance = new Npc(props);
        this.collection.push(instance);1
    }

    generate(props) {
        return new Npc(props);
    }
}

module.exports = NpcRepository;