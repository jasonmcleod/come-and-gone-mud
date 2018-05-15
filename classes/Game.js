// main game object
const config = require('../config');
const logger = require('../lib/logger');
const Client = require('./Client');
class Game {
    constructor(state) {
        this.clients = [];
        this.saveInterval = setInterval(() => {
            state.dataRepository.saveAll();
        }, config.SAVE_INTERVAL);
    }

    connect() {
        const newClient = new Client();
        this.clients.push(newClient);
        newClient.setContext('pregame');
        return newClient;
    }

    join(client, instance) {
        // kick out any other instance of this character
        if(this.clients.find((c) => {
            if(c.player && c.player.id == instance.id) {
                c.log('This account is logging in elsewhere... dropping this connection');
                this.leave(c);
            }
        }));
        client.player = instance;
        client.player.client = client; // O_O
        client.player.setPosition(instance.x, instance.y);
        this.broadcast(`${client.player.name} has joined the game.`);
        client.setContext('game');
        client.log(`Welcome to ${config.GAMENAME}`);
        client.player.logins++;
        if(client.player.logins===1) {
            client.log(config.INTRO_TEXT);
            client.setContext('first_time');
        }
    }

    leave(client) {                
        const name = client.player.name;
        if(client.telnetSocket) {
            client.telnetSocket.socket.end();
        } else {
            logger.log(`REPL can't actually quit`);
        }            
        // remove client from game object
        this.clients = this.clients.splice(this.clients.find((c) => c === client), 1);   
        setTimeout(() => {
            this.broadcast(`${name} has left the game.`);     
        }, 2000);
        
    }

    broadcast(what) {
        this.clients.forEach((c) => {
            if(c.player) {
                c.log(what);
            }
        });
    }

    getPlayersInArea(area) {
        const players = [];
        this.clients.forEach((c) => {
            if(c.player && c.player.x == area.x && c.player.y == area.y) players.push(c.player)
        });
        return players;
    }

    distanceFromCenter(x, y) {
        return 80;
    }
}

module.exports = Game;