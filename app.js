module.exports = (rules) => {

    // classes
    const Game = require('./classes/Game');
    const Client = require('./classes/Client');
    const Player = require('./classes/Player');
    const Npc = require('./classes/Npc');
    const Area = require('./classes/Area');
    const Item = require('./classes/Item');
    const Structure = require('./classes/Structure');

    // game content
    const CommandRepository = require('./data/CommandRepository');
    const ItemRepository = require('./data/ItemRepository');
    const LandmarkRepository = require('./data/LandmarkRepository');
    const NpcRepository = require('./data/NpcRepository');
    const StructureRepository = require('./data/StructureRepository');
    const ClassRepository = require('./data/ClassRepository');
    const ContextRepository = require('./data/ContextRepository');
    const DataRepository = require('./data/DataRepository');
    const AreaRepository = require('./data/AreaRepository');

    const logger = require('./lib/logger');

    // event emitter
    const events = require('./lib/events');
    // state object
    const state = {}

    events.init(state);

    // attach stuff to state
    state.commandRepository = new CommandRepository(state);
    state.itemRepository = new ItemRepository(state);
    state.landmarkRepository = new LandmarkRepository(state);
    state.npcRepository = new NpcRepository(state);
    state.structureRepository = new StructureRepository(state);
    state.classRepository = new ClassRepository(state);
    state.contextRepository = new ContextRepository(state);
    state.dataRepository = new DataRepository(state);
    state.areaRepository = new AreaRepository(state);

    // load content
    state.itemRepository.load();
    state.landmarkRepository.load();
    state.commandRepository.load();
    state.classRepository.load();
    state.contextRepository.load();
    state.dataRepository.load();
    state.npcRepository.load();
    state.structureRepository.load();
    state.game = new Game(state);

    if(rules.RUN_WEBSERVER) {
        const web = require('./clients/web');
        web(state);
    }

    if(rules.RUN_REPL) {
        const testClient = state.game.connect(null);
    
        // speed of development :P
        setTimeout(() => { state.commandRepository.execute(testClient, 'login'); }, 0);
        setTimeout(() => { state.commandRepository.execute(testClient, 'testscripts'); }, 0);
        setTimeout(() => { state.commandRepository.execute(testClient, 'testscripts'); }, 1000);
        setTimeout(() => { state.commandRepository.execute(testClient, '1'); }, 1500);

        const repl = require('./clients/repl');
        repl(state, testClient);
    }

    if(rules.RUN_TEST_SCRIPTS) {
        const testClient = state.game.connect(null);
        
        require('./test')(state, testClient);

        const repl = require('./clients/repl');
        repl(state, testClient);
    }

    if(rules.RUN_TELNETSERVER) {
        const telnet = require('./clients/telnet');
        telnet(state);
    }

    return state;
}