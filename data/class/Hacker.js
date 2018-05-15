const Player = require('../../classes/Player')
class Hacker extends Player {
    constructor(props={}) {
        super(props);        
        this.skills.assembly = props.assembly || 10;        
        this.skills.detection = props.detection || 0;
        // this.skills.substitution = props.substitution || 30;
        this.skills.research = props.research || 30;
    }    
}

module.exports = {
    data: {
        description: 'Hackers learn fast, by failing faster.',
        startingItems: ['pry bar']
    },
    class: Hacker
}