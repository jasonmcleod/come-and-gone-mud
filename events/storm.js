const chance = require('../lib/chance');
const range = require('../lib/range');
const logger = require('../lib/logger');
const config = require('../config');

const dealDamage = (client, item) => {
    const damage = item.totalWeight() * 2;
    client.player.vitals.health -= damage;
    client.log(`${item.fullName()} fell from the sky and hit you for ${damage} damage!`.red);
    if(client.player.vitals.health <= 0) {
        client.player.client.log(`The impact from ${item.fullName()} killed you!`.red);
        client.player.vitals.die();
    }
};

let nextStock = 0;
module.exports = (events, state) => {
    events.on('tick', () => {
        const now = Date.now();
        if(now > nextStock) {
            state.game.broadcast('A dark cloud covers the sky as a storm rolls through.');
            state.game.broadcast('You see debris and junk fill the air... watch your head!');
            events.state.areaRepository.collection.forEach((area) => {
                const total = area.inventory.items.length;
                if(total < config.POSSIBLE_ITEMS) {
                    const plainview = range(1, config.POSSIBLE_ITEMS - area.inventory.items.length);
                    const hidden = range(1, config.POSSIBLE_ITEMS - area.inventory.items.length);
                    const generatedItems = state.areaRepository.generateItems(area, plainview, hidden);
                    const heavy = false;
                    if(chance(config.CHANCE_OF_STORM_ITEMS)) {
                        if(generatedItems) {
                            const playersHere = state.game.getPlayersInArea(area);                        
                            playersHere.forEach((p) => {
                                p.client.log(`The winds have carried new items in the area.`);
                            });
                            events.emit('area_inventory_changed', area);
                            
                            generatedItems.forEach((i) => {
                                if(i.totalWeight() > 3) {
                                    state.game.getPlayersInArea(area).forEach((p) => {
                                        if(state.game.distanceFromCenter() > 50)
                                        if(chance(10)) {                                    
                                            // hit in the head or body?
                                            if(p.shelter) {
                                                p.client.log(`The [${p.shelter.fullName()}] protected you from the impact of the [${i.fullName()}]`);                                        
                                            } else {
                                                if(chance(50)) {
                                                    if(p.equipment.helmet().protection) {
                                                        p.client.log(`Your [${p.equipment.helmet().fullName()}] protected you from the impact.`);
                                                    } else {                                                
                                                        dealDamage(p.client,i);
                                                    }
                                                } else {
                                                    if(p.equipment.armor().protection) {
                                                        p.client.log(`Your [${p.equipment.armor().fullName()}] protected you from the impact.`);
                                                        dealDamage(p.client,i);
                                                    }
                                                }
                                            }
                                            
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            });
            nextStock = now + config.STORM_RATE + range(0, config.STORM_RATE_PAD);
        }
    });
};