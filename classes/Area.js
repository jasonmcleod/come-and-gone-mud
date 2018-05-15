// represents a space where players, npcs, items, and landmarks can exist

const inventoryMixin = require('../mixins/inventory');
const encountersMixin = require('../mixins/encounters')
class Area {
    constructor(props) {        
        Object.assign(this, inventoryMixin(this));
        Object.assign(this, encountersMixin(this));
        Object.assign(this, props);

        this.inventory.capacity = () => 300;

        this.name = this.name || props.name || 'Unnamed area';
    }
}

module.exports = Area;