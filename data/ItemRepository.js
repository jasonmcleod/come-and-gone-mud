const logger = require('../lib/logger');
const Item = require('../classes/Item');
const Repository = require('./Repository');
const colors = require('colors');
const isNum = require('../lib/isNum');
const colorsSafe = require('colors/safe');

class ItemRepository extends Repository {
    constructor(state) {
        super(state);
        this.state = state;
        this.type = 'item';
        this.collection = [];
        // todo: should move this out?
        this.attributes = {
            size: ['very small', 'small', 'large', 'very large'],
            length: ['very short', 'short', 'long', 'very long'],
            voltage: ['1.5v', '9v', '12v'],
            color: ['red', 'green', 'blue', 'orange']
        };
    }

    resolve(input, collection=this.collection) {
        let found = false;
        if(input instanceof Item) {
            return input;
        }
        if(isNum(input) ) {
            collection.forEach((i, index) => {
                if(input == index+1) found = i;
            });
        } else {
            collection.forEach((i) => {
                if(colors.strip(i.fullName().toLowerCase()) == colors.strip(input.toLowerCase())) {
                    found = i;
                    return;
                }
            });
        }

        return found;
    }

    find(str, specifications=false) {
        logger.log('bomb?', str);
        let found = super.find(str);
        if(found && specifications) {
            found = new Item(Object.assign(found, specifications));
            found.generated = true;
        }
        return found;
    }

    add(props) {
        logger.log('loaded item:', props.name);
        this.collection.push(new Item(props));
    }

    generate(props, overrides=false) {
        if(!props) throw('cannot generate item without a props!');
        // see if we can find this item by its base name
        const base = this.collection.find((i) => i.name == props.name);

        // if so, use it as a starting point
        if(base) Object.assign(props, base);

        // logger.log(base, props)
        if(!base && !props) throw('cannot generate item without a base or props!');
        
        // cast it as a item
        const item = new Item(props);

        // if this item has attributes, generate them
        if(props.hasOwnProperty('attributes')) {
            for(let a in props.attributes) {
                let rng = ~~(Math.random() * this.attributes[props.attributes[a]].length-1);
                item[props.attributes[a]] = this.attributes[props.attributes[a]][rng];
            }
        }

        // apply overrides
        if(overrides) Object.assign(item, overrides);

        return item;
    }
}

module.exports = ItemRepository;