module.exports = (state, client, player) => {

    let delta  = 0;
    setTimeout(() => {
        player.area.inventory.add(state.itemRepository.generate({name: 'metal detector'}));
        state.commandRepository.execute(client, 'me');
        state.commandRepository.execute(client, 'take metal detector');
        state.commandRepository.execute(client, 'me');
    }, delta+=500);
    
};