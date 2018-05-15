const Player = require('../classes/Player');
module.exports = (events, state) => {
    events.on('move', (player) => {
        if(player instanceof Player) {
            player.area = state.areaRepository.get(player.x, player.y);  
            setTimeout(() => { state.commandRepository.execute(player.client, 'look') }, 500);
        }
    });
};