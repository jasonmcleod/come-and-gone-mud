// once a client auths and selects a character - they become a player
const inventoryMixin = require('../mixins/inventory');
const equipmentMixin = require('../mixins/equipment');
const movementMixin = require('../mixins/movement');
const vitalsMixin = require('../mixins/vitals');
const skillsMixin = require('../mixins/skills');
const recordMixin = require('../mixins/record');
const combatMixin = require('../mixins/combat');

class Player {
    constructor(props) {
        Object.assign(this, inventoryMixin(this));
        Object.assign(this, equipmentMixin(this));
        Object.assign(this, movementMixin(this));
        Object.assign(this, vitalsMixin(this));
        Object.assign(this, skillsMixin(this));
        Object.assign(this, recordMixin(this));
        Object.assign(this, combatMixin(this));

        this.gold = this.gold || props.gold || 0;
        
        this.records = [];
        this.client = this.client || props.client;
        this.area = this.area || props.area || undefined;

        this.name = 'Unnamed player';
    }

    tool() {
        return this.equipment.wield();
    }
}

module.exports = Player;