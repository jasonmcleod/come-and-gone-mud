// base class for anything procedural

class ProceduralEntity {
    constructor(props) {
        this.attributes = props.attributes || [];
        this.name = props.name || [];
    }
    fullName() {
        let out = '';
        if(this.hasOwnProperty('attributes')) {
            this.attributes.forEach((a) => {
                out += this[a] + ' ';
            });
        }
        out+= this.name.cyan;
        return out;
    }
}

module.exports = ProceduralEntity;