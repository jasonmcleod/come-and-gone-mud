const fs = require('fs');
const logger = require('../lib/logger');

class Repository {
    constructor(state) {
        this.collection = [];
    }

    find(str) {
        const found = this.collection.find((i) => i.name.toLowerCase() == str.toLowerCase());
        if(found) return found;

        logger.warn(`Could not find ${this.type} by name: ${str}`);
        throw('ERROR IN REPOSITORY.FIND');

        return false;
    }

    load() {
        fs.readdirSync(`./data/${this.type}`).forEach(f => {
            let name = f.replace('.js','');
            let loaded = require(`../data/${this.type}/${name}`)(this);
        });
    }
}

module.exports = Repository;