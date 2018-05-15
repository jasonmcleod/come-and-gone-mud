const logger = require('../lib/logger');
const config = require('../config');
let nextAttack = 0;
// const meter = (value, max) => {
//     let meter = '';
//     for(let c=0; c < max;c++) {

//     }
// };
module.exports = (events, state) => {
    events.on('tick', () => {
        const now = Date.now();
        if(now > nextAttack) {            
            state.game.clients.forEach((client) => {
                if(client.player) {
                    const player = client.player;
                    // if(!player.shelter) {
                        if(player.target) {
                            const target = player.target;
                            if(player.target.x === player.x && player.target.y === player.y) {
                                console.log(`${player.name} should attack ${target.name}`);
                                const playerAttack = range(player.combat.minAttack, player.combat.maxAttack);
                                const targetAttack = range(target.combat.minAttack, target.combat.maxAttack);
                                client.log(`player: ${playerAttack}, target: ${targetAttack}`);

                                target.vitals.health -= playerAttack;                            
                                player.vitals.health -= targetAttack;
                                client.log(`You hit ${target.name} for ${playerAttack}`);
                                client.log(`Your HP: ${player.vitals.health} / ${player.vitals.healthMax}`);
                                client.log(`${target.name} hit you for ${targetAttack}`);
                                client.log(`Target HP: ${target.vitals.health} / ${target.vitals.healthMax}`);

                                if(target.vitals.health <= 0) {
                                    client.log(`You killed ${target.name}!`);
                                    player.area.encounters.remove(target);
                                    player.target = false;
                                }
                                if(player.vitals.health <= 0) {
                                    client.log(`${target.name} killed you!`);
                                    player.vitals.die();
                                }
                            }
                        }
                    }
                // } else {
                    // in shelter, cant attack
                // }
            });
            nextAttack = now + config.COMBAT_SPEED;
        }
    });
};