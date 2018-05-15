const logger = require('./lib/logger');
const colorsSafe = require('colors/safe');
const rules = {
    RUN_REPL: false,
    RUN_WEBSERVER: false,
    RUN_TELNETSERVER: false,
    RUN_TEST_SCRIPTS: false
}
const state = require('./app')(rules);

const reports = {
    missing: false,
    counter: true,
    chance: false,
    blueprints: true
};

const scale = [
    {chance: '-1', color: 'orange'},
    {chance: '25', color: 'magenta'},
    {chance: '50', color: 'blue'},
    {chance: '75', color: 'cyan'},
    {chance: '90', color: 'gray'},     
    {chance: '200', color: 'red'}   
];

const matrix = {
    parts: [],
    builds: [],
};

const collectionCopy = state.itemRepository.collection.splice(0);
collectionCopy.forEach((item) => {
    item.uses = 0;
    matrix.parts.push(item);
});

// if(reports.missing) {
    logger.log('---------- missing parts report -------------');
    
    collectionCopy.forEach((item) => {
        if(item.hasOwnProperty('parts')) {
            matrix.builds.push(item);
            item.parts.forEach((part) => {
                const found = matrix.parts.find((p) => p.name == part.name);
                if(found) {
                    found.uses++;
                } else {
                    logger.log(`build ${item.name} requires a part that does not exist!`.red);
                }
            });
        }
    });
// }

if(reports.counter) {
    logger.log('---------- uses counter report -------------');

    collectionCopy.sort((a, b) => a.uses > b.uses ? -1 : 1);
    collectionCopy.forEach((item) => {
        const coloredName = item.hasOwnProperty('parts') ? item.name.blue : item.name.yellow;
        if(item.uses === 0) {
            logger.log(`${coloredName} is used in ` + (item.uses + ' builds').red);
        } else {
            logger.log(`${coloredName} is used in ` + (item.uses + ' builds').green);
        }
    });
}

if(reports.chance) {

    logger.log('---------- chance of finding (item) report -------------');

    collectionCopy.sort((a, b) => a.chanceOfFinding() > b.chanceOfFinding() ? -1: 1);
    collectionCopy.forEach((item) => {
        if(!item.chance) logger.error(`${item.name} has no chance of being found`);
        let c = scale.find((s) => s.chance >= item.chanceOfFinding());
        
        logger.log(`[${item.name.cyan}] chances: ${colorsSafe[c.color](item.chanceOfFinding())} / 100}`);            
    });
}

if(reports.blueprints) {
    logger.log('---------- chance of finding (blueprint) report -------------');

    const blueprints = [];
    collectionCopy.forEach((item) => {
        if(item.hasOwnProperty('parts')) blueprints.push(item);
    });

    blueprints.sort((a, b) => a.chance.bp > b.chance.bp ? -1: 1);
    blueprints.forEach((item) => {
        if(!item.chance) logger.error(`${item.name} has no chance of being found.`);
        let c = scale.find((s) => s.chance >= item.chance.bp);
        console.log(item.name, c);
        logger.log(`[${item.name.cyan}] blueprint chances (after ${colorsSafe[c.color](item.chance.item)} / 100 roll): ${colorsSafe[c.color](item.chance.bp)} / 100}`);            
    });
}