const logger = require('../../../lib/logger');
const chance = require('../../../lib/chance');
const config = require('../../../config');
const events = require('../../../lib/events');
module.exports = (repo, state) => ({
    
    help: (client) => {
        client.log('fish: go fishing');
    },

    execute: (client, str) => {
        const player = client.player;
        if(player.inventory.has('fishing pole')) {
            if(player.area.encounters.has('pond')) {
                const pond = player.area.encounters.findLandmark('pond');
                client.log('You begin to fish...');
                player.vitals.stamina-=1;
                setTimeout(() => {
                    if(pond.meta.stock > 0 && chance(player.skills.fishing - config.FISHING_NERF)) {
                        client.log('You caught a fish!');
                        if(chance(config.FISHING_SKILL_INCREASE_CHANCE)) {
                            events.emit('skill_up', client, 'fishing');
                        }
                        if(player.inventory.add(state.itemRepository.find('fish'))) {
                            pond.meta.stock--;
                        } else {
                            client.log('You caught a fish, but you have nowhere to put it! Inventory is full!');
                        }                        
                    } else {
                        client.log('Nothing seems to be biting.');
                    }
                }, range(config.FISHING_MIN_TIME, config.FISHING_MAX_TIME));
                logger.log('DEBUG: Fish stock', pond.meta);
            } else {
                client.log('You need to be near water to fish.');
            }
        } else {
            client.log('You need a fishing pole to fish.');
        }
    }
});