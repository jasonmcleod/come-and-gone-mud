const Player = require('../classes/Player');
module.exports = (events, state) => {
    events.on('area_inventory_changed', (area) => {
        const playersHere = state.game.getPlayersInArea(area);
        playersHere.forEach((p) => {
            if(area.inventory.items.length) {
                area.inventory.asList(p.client);
            } else {
                p.client.log(`There don't seem to be any items here`);
            }
        });
    });
};