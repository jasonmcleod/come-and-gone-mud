const events = require('../lib/events');
const Player = require('../classes/Player');
const calculateTotal = (self, skill) => {
    let bonus = 0;
    self.inventory.items.forEach((i) => {
        if(i.equipped && i.hasOwnProperty('modifiers') && i.modifiers.hasOwnProperty('skills')) {
            bonus += i.modifiers.skills[skill] || 0;
        }

        if(i.hasOwnProperty('passiveModifiers') && i.passiveModifiers.hasOwnProperty('skills')) {
            bonus += i.passiveModifiers.skills[skill] || 0;
        }
    });
    return self.skills[skill] + bonus;
}

module.exports = (self) => ({
    skills: {
        fishing: 98, // just keep fishing.
        lumberjacking: 98, // just keep chopping wood.
        assembly: 0, // the more you assemble things, the sharper this gets.
        detection: 0, // more unique collection = better detection (how the hell do i write this one?)
        // substitution: 0, // the more you try to make things with the wrong item, the sharper this gets.
        research: 0, // each failure to build will increase research

        totalAssembly: () => { return calculateTotal(self, 'assembly'); },
        totalDetection: () => { return calculateTotal(self, 'detection'); },
        // totalSubstitution: () => { return calculateTotal(self, 'substitution'); },
        totalResearch: () => { return calculateTotal(self, 'research'); },
    }   
});