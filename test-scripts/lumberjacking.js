const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {
    config.override('LUMBERJACKING_MIN_TIME', 0)
    config.override('LUMBERJACKING_MAX_TIME', 0)

    let delta  = 0;
    // add an axe to the area and pick it up
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'axe'}));
        state.commandRepository.execute(client, 'look');
        state.commandRepository.execute(client, 'take 1');
        state.commandRepository.execute(client, 'inventory');
    }, delta+=500);

    // add a pond to the area
    setTimeout(() => {
        const generated = state.landmarkRepository.generate({name: 'trees'});
        if(generated.hasOwnProperty('onCreate')) generated.onCreate(generated);
        player.area.encounters.add(generated);
        player.area.encounters.landmarks[0].meta.stock = 1;

        player.skills.lumberjacking = 0;
        state.commandRepository.execute(client, 'chop');
        setTimeout(() => {
            if(player.inventory.has('wood')) {
                logger.error('test fail'.red + ': Should NOT have collected wood, but DID');
            } else {
                logger.log('test pass'.green + ': Didnt collect wood with low skill');
            }
        }, 100);
    }, delta+=500);

    setTimeout(() => {
        player.skills.lumberjacking = 200;
        state.commandRepository.execute(client, 'chop');
        setTimeout(() => {
            if(!player.inventory.has('wood')) {
                logger.error('test fail'.red + ': Should have collected wood, but didnt');
            } else {
                logger.log('test pass'.green + ': did collect wood with high skill');
            }
        }, 100);
    }, delta+=3500);

};