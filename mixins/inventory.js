const config = require('../config');
const logger = require('../lib/logger');
const pad = require('../lib/pad');

module.exports = (self, overrides) => {
    overrides = overrides || {};
    return {
        inventory: {
            items: [],
            add: (item) => {
                if(self.inventory.totalWeight() + item.totalWeight() <= self.inventory.capacity()) {
                    self.inventory.items.push(item);
                    return true;
                } else {
                    return false;
                }
            },

            remove: (item) => {
                const found = self.inventory.find(item);
                if(found>=0) {
                    self.inventory.items.splice(found, 1);                
                    return true;
                } else {
                    return false;
                }
            },

            clear: () => {
                self.inventory.items.length = 0;
            },

            find: (item) => {
                const found = self.inventory.items.findIndex((i) => i === item);
                if(found>-1) return found;
                return false;
            },

            has: (input, substitution=false) => {
                if(typeof input === 'string') {
                    return self.inventory.items.find((item) => item.name == input);
                } else {
                    if(substitution) {
                        return self.inventory.items.find((item) => item == input);
                    } else {
                        return self.inventory.items.find((item) => item.fullName() == input.fullName());
                    }
                }
            },

            totalWeight: () => {
                let weight = 0;
                self.inventory.items.forEach((i) => {
                    weight += i.totalWeight();
                });
                return weight;
            },

            capacity: () => {
                let bonus = 0;
                self.inventory.items.forEach((i) => {
                    if(i.hasOwnProperty('passiveModifiers') && i.passiveModifiers.hasOwnProperty('extra')) {
                        bonus = i.passiveModifiers.extra.capacity || 0;
                    }
                });
                return config.INVENTORY_MAX_SIZE + bonus;
            },

            asList: (client, showHidden=false) => {
                if(self.inventory.items.length) {
                    self.inventory.items.forEach((i, index) => {
                        let extra = i.hasOwnProperty('parts') ? '   (device)'.green : '     (item)'.yellow;
                        if(i.blueprint) extra = '(blueprint)'.cyan;
                        let equipped = (i.hasOwnProperty('equipped') && i.equipped )? '(equipped)' : '';
                        if((i.hidden && showHidden) || !i.hidden) {
                            let hidden = i.hidden ? '[hidden]' : '';
                            client.log(`\t${pad(index+1,2)})   ${extra} ${i.fullName()} (weight: ${i.totalWeight()}) ${equipped} ${hidden}`);
                        }
                    });
                }
            }
        }
    }
};