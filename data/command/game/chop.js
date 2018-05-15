const logger = require('../../../lib/logger');
const chance = require('../../../lib/chance');
const config = require('../../../config');
const events = require('../../../lib/events');
module.exports = (repo, state) => ({
    
    help: (client) => {
        client.log('chop: chop wood');
    },

    execute: (client, str) => {
        const player = client.player;
        if(player.inventory.has('axe')) {
            if(player.area.encounters.has('trees')) {
                const trees = player.area.encounters.findLandmark('trees');
                client.log('You begin to chop wood...');
                player.vitals.stamina-=1;
                setTimeout(() => {
                    if(trees.meta.stock > 0) {
                        if(chance(player.skills.lumberjacking - config.LUMBERJACKING_NERF)) {
                            client.log('You collect some wood.');
                            if(chance(config.LUMBERJACKING_SKILL_INCREASE_CHANCE)) {
                                events.emit('skill_up', client, 'lumberjacking');
                            }
                            if(player.inventory.add(state.itemRepository.find('wood'))) {
                                trees.meta.stock--;
                            } else {
                                client.log('You chop some wood, but you have nowhere to put it! Inventory is full!');
                            }                        
                        } else {
                            client.log('No luck this time.');
                        }
                    } else {
                        client.log('Not much left here.');
                    }
                }, range(config.LUMBERJACKING_MIN_TIME, config.LUMBERJACKING_MAX_TIME));
                logger.log('DEBUG: Wood stock', trees.meta.stock);
            } else {
                client.log('You need to be near trees to chop wood.');
            }
        } else {
            client.log('You need an axe to chop wood.');
        }
    }
});