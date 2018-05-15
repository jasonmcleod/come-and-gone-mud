const logger = require('../lib/logger');
const config = require('../config');
let nextStock = 0;
module.exports = (events) => {
    events.on('tick', () => {
        const now = Date.now();
        if(now > nextStock) {            
            events.state.areaRepository.collection.forEach((area) => {                
                if(area.encounters.has('pond')) {
                    const pond = area.encounters.findLandmark('pond');
                    pond.meta.stock = (pond.meta.stock || 0);
                    if(pond.meta.stock < config.FISHING_POSSIBLE_STOCK) {                        
                        pond.meta.stock++;
                    }
                }
            });
            nextStock = now + config.FISHING_STOCK_RATE;
        }
    });
};