// not used yet, but these would be things like shack, tent, or building

const ProceduralEntity = require('./ProceduralEntity');
class Structure extends ProceduralEntity {
    constructor(props) {
        super(props);
        Object.assign(this, props);
        this.owner = props.owner || false;
        this.occupied = props.occupied || false;
    }

    fullName() {
        if(this.owner) {
            return `${this.owner}'s ${this.name}`;
        } else {
            return this.name;
        }
    }
}

module.exports = Structure;