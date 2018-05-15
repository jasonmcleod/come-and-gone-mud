// commands which a user can type in
class Command {
    constructor(props) {
        Object.assign(this, props);
        this.admin = props.admin || false;
    }
}

module.exports = Command;