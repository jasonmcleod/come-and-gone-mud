module.exports = (state, client, player) => {

    let delta  = 0;
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'metal detector'}));
        state.commandRepository.execute(client, 'skills');
        state.commandRepository.execute(client, 'take metal detector');
        state.commandRepository.execute(client, 'skills');
    }, delta+=500);
    
};