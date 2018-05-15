// non playing characters
const ProcedualEntity = require('./ProceduralEntity');
class Npc extends ProcedualEntity {
    constructor(props) {
        super(props);
        Object.assign(this, props);
    }
}

module.exports = Npc;