module.exports = (state, client) => {

    const CLEAR_AREA = false;
    let player;
    let delta = 0;

    // login
    setTimeout(() => { state.commandRepository.execute(client, 'login'); }, delta+=500);

    // account name test
    setTimeout(() => { state.commandRepository.execute(client, 'testscripts'); }, delta+=500);

    // password test
    setTimeout(() => { state.commandRepository.execute(client, 'testscripts'); }, delta+=500);

    // select first character
    setTimeout(() => { state.commandRepository.execute(client, '1'); }, delta+=500);

    // clear the area of items, npcs, encounters, and structures
    // clear the test players inventory
    setTimeout(() => {
        player = client.player;
        player.setPosition(-1000, -1000);
        if(CLEAR_AREA) {
            player.area.inventory.items.length = 0;
            player.area.encounters.npcs.length = 0;
            player.area.encounters.landmarks.length = 0;
            player.area.encounters.npcs.length = 0;
            player.area.encounters.structures.length = 0;
            player.inventory.items.length = 0;
            logger.log('area cleared');
        }
    }, delta+=500);

    
    // these will not be successful if they are all uncommented at once
    // setTimeout(() => { require('./test-scripts/look')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/take-and-drop')(state, client, player, delta); }, delta+=500);    
    // setTimeout(() => { require('./test-scripts/say')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/fishing')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/lumberjacking')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/movement-and-stamina')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/equip-and-unequip')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/dismantle')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/build')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/skill-detection')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/passive-modifiers')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/research-boost-with-notes')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/chance')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/place-and-enter-tent')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/move-around')(state, client, player, delta); }, delta+=500);
    setTimeout(() => { require('./test-scripts/combat')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/eat')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/build-terminal')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/build-compass')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/build-fort')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/build-fishingpole')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/storm')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/inspect')(state, client, player, delta); }, delta+=500);
    // setTimeout(() => { require('./test-scripts/range')(state, client, player, delta); }, delta+=500);
    
};