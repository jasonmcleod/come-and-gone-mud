const Npc = require('../classes/Npc');
const Structure = require('../classes/Structure');
const Landmark = require('../classes/Landmark');
const logger = require('../lib/logger');
const colors = require('colors');

module.exports = (self) => ({

    encounters: {
        npcs: [],
        structures: [],
        fixtures: [],
        landmarks: [],
        add: (input) => {
            if(input instanceof Npc) self.encounters.npcs.push(input);
            if(input instanceof Structure) self.encounters.structures.push(input);
            if(input instanceof Landmark) self.encounters.landmarks.push(input);
            return true;
        },

        remove: (input) => {
            if(input instanceof Npc) collection = self.encounters.npcs;
            if(input instanceof Structure) collection = self.encounters.structures;
            if(input instanceof Landmark) collection = self.encounters.landmarks;

            const index = collection.findIndex((n) => n == input);
            if(index>-1) collection.splice(index, 1);
        },

        has: (what) => {           
            let encounter = self.encounters.structures.find((s) => colors.strip(s.name.toLowerCase()) == colors.strip(what.toLowerCase()));
            let landmark = self.encounters.landmarks.find((s) => colors.strip(s.name.toLowerCase()) == colors.strip(what.toLowerCase()));
            let structure = self.encounters.structures.find((s) => colors.strip(s.name.toLowerCase()) == colors.strip(what.toLowerCase()));
            if(encounter || landmark || structure) return true;
        },

        findLandmark: (what) => {           
            let landmark = self.encounters.landmarks.find((s) => colors.strip(s.name.toLowerCase()) == colors.strip(what.toLowerCase()));
            return landmark || false;
        },

        findStructure: (what) => {           
            let structure = self.encounters.structures.find((s) => colors.strip(s.name.toLowerCase()) == colors.strip(what.toLowerCase()));
            return structure || false;
        },

        findNpc: (what) => {           
            let npc = self.encounters.npcs.find((s) => colors.strip(s.name.toLowerCase()) == colors.strip(what.toLowerCase()));
            return npc || false;
        }
    }
});