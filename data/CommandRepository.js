// does not extend Repository...

const fs = require('fs');
const config = require('../config');
const logger = require('../lib/logger');
const Command = require('../classes/Command');

class CommandRepository {
    constructor(state) {
        this.state = state;
        this.collection = {};
    }

    add(context, command) {
        logger.log(`loaded command: ${context} > ${command.name}`);
        this.collection[context].push(new Command(command));
    }

    load() {
        fs.readdirSync(`./data/command`).forEach(context => {
            this.collection[context] = [];
            const commands = fs.readdirSync(`./data/command/${context}`);
            commands.forEach(f => {
                let name = f.replace('.js','');
                try {
                    let loaded = require(`../data/command/${context}/${name}`)(this, this.state);
                    loaded.name = name;
                    if(commands.indexOf('help.js')>-1 && !loaded.hasOwnProperty('execute')) console.warn(`BOOTSTRAP ERROR: context "${context}" has a "help" command, but command "${name}" does not have an "execute" method`);
                    if(commands.indexOf('help.js')>-1 && !loaded.hasOwnProperty('help'))    console.warn(`BOOTSTRAP ERROR: context "${context}" has a "help" command, but command "${name}" does not have a "help" method`);

                    if(loaded.hasOwnProperty('alias')) {
                        loaded.alias.forEach((a) => {
                            const copy = Object.assign({}, loaded);
                            delete copy.alias
                            copy.name = a;
                            copy.aliasOf = name;
                            this.add(context, copy);
                        });
                    }
                    this.add(context, loaded);
                } catch(err) {
                    logger.log(`Error loading command ${context} > ${name}`);
                    console.error(err);
                }
            });
        });
    }

    execute(client, str) {
        if(str==='') return;
        if(str==='?') {
            // replay the greeting from the current context
            client.setContext(client.getContext());
            return;
        }
        const parts = str.split(' ');
        const cmd = parts.shift();
        const found = this.collection[client.getContext()].find((c) => c.name === cmd);
        if(found && found.admin && !client.player.admin) {
            logger.log(client.player.name, 'cannot use admin command', str);
            return false;
        }
        if(!found) {
            const wildcard = this.collection[client.getContext()].find((c) => c.name === '_wildcard')
            if(wildcard) {
                wildcard.execute(client, str);
            } else {
                client.log(`Not something I understand. (${str})`);
            }
        } else {
            client.lastCommand = str;
            found.execute(client, parts.join(' '));
        }
    }
}

module.exports = CommandRepository;