const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {

    let delta  = 0;
    // add a fishing pole to the area and pick it up
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'build tester easy'}, {blueprint: true}));
        player.area.inventory.add(state.itemRepository.generate({name: 'gear'}, {size: 'large'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'enclosure'}, {size: 'large'}));
        // state.commandRepository.execute(client, 'look');
        // state.commandRepository.execute(client, 'take build tester easy');
        // state.commandRepository.execute(client, 'take large gear');
        // state.commandRepository.execute(client, 'take large enclosure');
        // state.commandRepository.execute(client, 'build build tester easy');
        // state.commandRepository.execute(client, 'yes');
    }, delta+=500);

    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'build tester hard'}, {blueprint: true}));
        player.area.inventory.add(state.itemRepository.generate({name: 'gear'}, {size: 'very small'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'enclosure'}, {size: 'very small'}));
        state.commandRepository.execute(client, 'look');
        state.commandRepository.execute(client, 'take build tester hard');
        state.commandRepository.execute(client, 'take very small gear');
        state.commandRepository.execute(client, 'take very small enclosure');
        state.commandRepository.execute(client, 'build build tester hard');
        state.commandRepository.execute(client, 'yes');
    }, delta+=1500);

};