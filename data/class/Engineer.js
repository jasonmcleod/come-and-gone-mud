const Player = require('../../classes/Player')
class Engineer extends Player {
    constructor(props={}) {
        super(props);
        this.skills.assembly = props.assembly || 30;
        this.skills.detection = props.detection || 0;
        // this.skills.substitution = props.substitution || 10;
        this.skills.research = props.research || 10;
    }
}

module.exports = {
    data: {
        description: 'Engineers can assemble and dismantle things with greater success than some others.',
        startingItems: ['screw driver']
    },
    class: Engineer
}