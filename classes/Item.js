// anything that can be picked up by a player
const logger = require('../lib/logger');

const ProceduralEntity = require('./ProceduralEntity');
class Item extends ProceduralEntity {
    constructor(props) {
        super(props);
        this.hidden = false;
        this.type = 'unknown';
        this.blueprint = props.blueprint || false;
        this.generated = props.generated || false;
        // this.weight = props.weight || 1;
        this.modifiers = props.modifiers || {};
        this.chance = props.chance || {};
        Object.assign(this, props);
    }

    totalWeight() {
        if(this.blueprint) return 0;
        if(this.hasOwnProperty('weight')) return this.weight;

        let total = 0;
        const weightScan = (item) => {
            if(item.hasOwnProperty('parts')) {
                item.parts.forEach((p) => {
                    total+=p.weight || 0;
                    return weightScan(p);
                });
            } else {
                return item.weight || 0;
            }
        }
        weightScan(this);
        return total; 
    }

    modifiersAsText() {
        let out = '';
        if(this.hasOwnProperty('modifiers') && this.modifiers.hasOwnProperty('skills')) {
            for(let m in this.modifiers.skills) {
                const val = this.modifiers.skills[m];
                const sign = val > 0 ? '+' : '';
                out += `${m}: ${sign}${val}` 
            }
        }
        return out;
    }

    chanceOfFinding() {
        const chance = typeof this.chance == 'object' ? this.chance.item : this.chance;
        if(chance === 0) logger.log(`chanceOfFinding (${this.name}) is returning 0!`);
        return chance;
    }

    isComplex() {
        return this.hasOwnProperty('parts');
    }
}

module.exports = Item;