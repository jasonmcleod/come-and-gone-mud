// non playing characters
const ProcedualEntity = require('./ProceduralEntity');
const vitalsMixin = require('../mixins/vitals');
const movementMixin = require('../mixins/movement');
const combatMixin = require('../mixins/combat');

class Npc extends ProcedualEntity {
    constructor(props) {
        super(props);
        Object.assign(this, vitalsMixin(this));
        Object.assign(this, movementMixin(this));
        Object.assign(this, combatMixin(this));
        Object.assign(this, props);
        this.vitals.health = props.vitals.healthMax;
    }
}

module.exports = Npc;