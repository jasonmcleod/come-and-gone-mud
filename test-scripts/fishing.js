const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {
    config.override('FISHING_MIN_TIME', 0)
    config.override('FISHING_MAX_TIME', 0)

    let delta  = 0;
    // add a fishing pole to the area and pick it up
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'fishing pole'}));
        state.commandRepository.execute(client, 'look');
        state.commandRepository.execute(client, 'take 1');
    }, delta+=500);

    // add a pond to the area
    setTimeout(() => {
        const generated = state.landmarkRepository.generate({name: 'pond'});
        if(generated.hasOwnProperty('onCreate')) generated.onCreate(generated);
        player.area.encounters.add(generated);
        player.area.encounters.landmarks[0].meta.stock = 1;

        player.skills.fishing = 0;
        state.commandRepository.execute(client, 'fish');
        setTimeout(() => {
            if(player.inventory.has('fish')) {
                logger.error('test fail'.red + ': Should NOT have caught fish, but DID');
            } else {
                logger.log('test pass'.green + ': Didnt catch fish with low skill');
            }
        }, 100);
    }, delta+=500);

    setTimeout(() => {
        player.skills.fishing = 200;
        state.commandRepository.execute(client, 'fish');
        setTimeout(() => {
            if(!player.inventory.has('fish')) {
                logger.error('test fail'.red + ': Should have caught fish, but didnt');
            } else {
                logger.log('test pass'.green + ': did catch fish with high skill');
            }
        }, 100);
    }, delta+=3500);

};