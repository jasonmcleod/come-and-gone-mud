const Player = require('../../classes/Player')
class Scavenger extends Player {
    constructor(props={}) {
        super(props);
        this.skills.assembly = props.assembly || 10;
        this.skills.detection = props.detection || 20;
        // this.skills.substitution = props.substitution || 5;
        this.skills.research = props.research || 10;
    }
}

module.exports = {
    data: {
        description: 'You are also somewhat of a hoarder...',
        startingItems: ['pry bar', 'high capacity cart']
    },
    class: Scavenger
}