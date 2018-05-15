const logger = require('../lib/logger');
const config = require('../config');
module.exports = (state, client, player) => {

    let delta  = 0;



    const parts = [
    'keypad button', 'keypad button', 'keypad button', 'keypad button',
    'keypad button', 'keypad button', 'keypad button', 'keypad button',
    'keypad button', 'keypad button', 'keypad button', 'keypad button',
    'keypad button', 'keypad button', 'keypad button', 'keypad button',
    'speaker', 'speaker', 'radio crystal', 'radio transmitter', 'screen',
    'LED', 'LED', 'LED', 'LED', 'LED', 'LED',
    'generator', 'antenna', 'circuit board', 'circuit board', 'circuit board', 
    'wire', 'wire', 'wire', 'wire', 'wire',
    'wire', 'wire', 'wire', 'wire', 'wire'
    ]
    setTimeout(() => {
        // player.area.inventory.add(state.itemRepository.generate({name: 'distress terminal'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'distress terminal'}, {blueprint: true}));
        player.area.inventory.add(state.itemRepository.generate({name: 'drill'}));

        parts.forEach((p) => {
            player.area.inventory.add(state.itemRepository.generate({name: p}));
        });
        
        state.commandRepository.execute(client, 'take drill');
        state.commandRepository.execute(client, 'equip drill');
        state.commandRepository.execute(client, 'take distress terminal');
        state.commandRepository.execute(client, 'inventory');

        player.area.inventory.add(state.itemRepository.generate({name: 'wire'}, {length: 'very long', color: 'one-color'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wire'}, {length: 'very long', color: 'one-color'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wire'}, {length: 'very long', color: 'one-color'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wire'}, {length: 'very long', color: 'one-color'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wire'}, {length: 'very long', color: 'one-color'}));
        player.area.inventory.add(state.itemRepository.generate({name: 'wire'}, {length: 'very long', color: 'one-color'}));
        
        setTimeout(() => {
            parts.forEach((p) => {
                state.commandRepository.execute(client, 'take 1');
            });

            state.commandRepository.execute(client, 'take very long one-color wire');
            state.commandRepository.execute(client, 'take very long one-color wire');
            state.commandRepository.execute(client, 'take very long one-color wire');
            state.commandRepository.execute(client, 'take very long one-color wire');
            state.commandRepository.execute(client, 'take very long one-color wire');
            state.commandRepository.execute(client, 'take very long one-color wire');
            
            state.commandRepository.execute(client, 'build distress terminal');
        }, 1000);

    }, delta+=500);

};