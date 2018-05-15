// ponds, trees, etc
const ProceduralEntity = require('./ProceduralEntity');
class Landmark extends ProceduralEntity {
    constructor(props) {
        super(props);
        Object.assign(this, props);
        this.meta = {};
    }
}

module.exports = Landmark;