const config = require('../config');
const logger = require('../lib/logger');
const Landmark = require('../classes/Landmark');
const Repository = require('./Repository');

class LandmarkRepository extends Repository {
    constructor(state) {
        super(state);
        this.type = 'landmark';
        this.collection = [];
    }

    add(props) {
        logger.log('loaded landmark:', props.name);
        this.collection.push(new Landmark(props));
    }

    generate(props) {
        const part = new Landmark(props);
        return part;
    }
}

module.exports = LandmarkRepository;