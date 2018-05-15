// does not extend Repository...

const fs = require('fs');
const logger = require('../lib/logger');

class ClassRepository {
    constructor(state) {
        this.collection = [];
    }

    add(c) {
        logger.log('loaded class:', c.name)
        this.collection.push(c);
    }

    cast(name, props) {
        const found = this.collection.find((c) => c.name.toLowerCase() === name.toLowerCase());
        if(found) {
            return new found.obj.class(props);
        } else {
            logger.error(`Could not find a player class named ${name}`);
        }
    }

    find(str) {
        return this.collection.find((c) => c.name.toLowerCase() == str.toLowerCase());
    }

    load() {
        fs.readdirSync(`./data/class`).forEach(f => {
            let name = f.replace('.js','');
            let obj = require(`../data/class/${name}`);
            this.add({name: name, obj});
        });
    }
}

module.exports = ClassRepository;