const logger = require('../lib/logger');
const config = require('../config');
let nextStock = 0;
module.exports = (events) => {
    events.on('tick', () => {
        const now = Date.now();
        if(now > nextStock) {            
            events.state.areaRepository.collection.forEach((area) => {                
                if(area.encounters.has('trees')) {
                    const trees = area.encounters.findLandmark('trees');
                    trees.meta.stock = (trees.meta.stock || 0);
                    if(trees.meta.stock < config.FISHING_POSSIBLE_STOCK) {                        
                        trees.meta.stock++;
                    }
                }
            });
            nextStock = now + config.TREES_STOCK_RATE;
        }
    });
};