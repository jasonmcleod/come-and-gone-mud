// does not extend Repository...

const logger = require('../lib/logger');
const Area = require('../classes/Area');
const config = require('../config');
const chance = require('../lib/chance');
const range = require('../lib/range');
const arrayShuffle = require('../lib/arrayShuffle');

class AreaRepository {
    constructor(state) {
        this.collection = []; 
        this.state = state;
    }

    add(props) {
        this.collection.push(new Area(props));
    }

    get(x, y) {
        let found = false;
        this.collection.forEach((r) => {
            if(r.x === x && r.y === y) {
                found = r;
            }
        });

        if(found) {
            return found;
        } else {
            return this.generate(x, y);
        }
    }

    generateItems(area, plainview, hidden) {
        logger.log('genreating items');
        for(let i = 0; i < plainview; i++) {
            const roll = range(0, 100);
            const copy = arrayShuffle(this.state.itemRepository.collection.filter((i) => i.chanceOfFinding() > 0));
            const pick = copy.find((i) => i.chanceOfFinding() >= roll);
            if(pick) {                
                const generated = this.state.itemRepository.generate(pick);
                if(generated.isComplex()) {
                    generated.blueprint = generated.isComplex() ? chance(100 - generated.chance.bp) : false;
                }
                area.inventory.add(generated);
            } else {
                logger.error(`could not pick an item to generate! (roll was ${roll}) - skipping this addition`);
            }
        }

        for(let i = 0; i < hidden; i++) {
            const rng = range(0, this.state.itemRepository.collection.length);
            const generated = this.state.itemRepository.generate(this.state.itemRepository.collection[rng]);
            generated.hidden = true;
            area.inventory.add(generated);
        }
    }

    generateLandmarks(area) {

        const roll = range(0, 100);
        const copy = arrayShuffle(this.state.landmarkRepository.collection.filter((i) => i.chance > 0));
        const pick = copy.find((i) => i.chance >= roll);
        if(pick) {                
            const generated = this.state.landmarkRepository.generate(pick);
            if(generated.hasOwnProperty('onCreate')) generated.onCreate(generated);
            area.encounters.add(generated);
        }
    }

    generateNpcs(area) {
        // todo: make npc findable with a mixin
        const roll = range(0, 100);
        const copy = arrayShuffle(this.state.npcRepository.collection.filter((i) => i.chance > 0));
        const pick = copy.find((i) => i.chance >= roll);
        if(pick) {                
            const generated = this.state.npcRepository.generate(pick);
            if(generated.hasOwnProperty('onCreate')) generated.onCreate(generated);
            generated.x = area.x;
            generated.y = area.y;
            area.encounters.add(generated);
        }
    }

    generate(x, y) {
        logger.info('Generated new Area', x, y);
        const newArea = new Area({ x: x, y: y });

        if(chance(config.CHANCE_OF_ITEMS)) {                       
            const plainview = range(1, config.POSSIBLE_ITEMS);
            const hidden = range(1, config.POSSIBLE_HIDDEN_ITEMS);
            this.generateItems(newArea, plainview, hidden);
        }
        if(chance(config.CHANCE_OF_LANDMARK)) {            
            this.generateLandmarks(newArea);
        }
        if(chance(config.CHANCE_OF_NPCS)) {
            this.generateNpcs(newArea);
        }

        this.add(newArea);

        return newArea;
    }
}

module.exports = AreaRepository;