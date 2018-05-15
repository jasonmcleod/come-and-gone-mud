const config = require('../config');
const logger = require('../lib/logger');
const Structure = require('../classes/Structure');
const Repository = require('./Repository');

class StructureRepository extends Repository {
    constructor(state) {
        super(state);
        this.type = 'structure';
    }

    add(props) {
        const structure = new Structure(props);
        this.collection.push(structure);
    }

    generate(props) {
        return new Structure(props);
    }
}

module.exports = StructureRepository;