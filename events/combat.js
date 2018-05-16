const logger = require('../lib/logger');
const chance = require('../lib/chance');
const config = require('../config');
const range = require('../lib/range');

let nextAttack = 0;
module.exports = (events, state) => {
    events.on('tick', () => {
        const now = Date.now();
        if(now > nextAttack) {            
            state.game.clients.forEach((client) => {
                if(client.player) {
                    const player = client.player;
                    if(player.target) {
                        const target = player.target;
                        if(player.target.x === player.x && player.target.y === player.y) {
                            const weapon = player.equipment.wield();
                            const hitBonus = weapon ? weapon.attack : 0;
                            const playerAttack = range(player.combat.minAttack, player.combat.maxAttack) + hitBonus;
                            const targetAttack = range(target.combat.minAttack, target.combat.maxAttack);

                            target.vitals.health -= playerAttack;                            
                            player.vitals.health -= targetAttack;
                            client.log(`You hit ${target.name} for ${playerAttack} with your [${weapon.fullName().cyan}]`.green);
                            client.log(`\tYour HP: ${Math.max(0, player.vitals.health)} / ${player.vitals.healthMax}`);
                            client.log(`${target.name} hit you for ${targetAttack}`.red);
                            client.log(`\tTarget HP: ${Math.max(0, target.vitals.health)} / ${target.vitals.healthMax}`);

                            if(target.vitals.health <= 0) {                                

                                client.log(`You killed ${target.name}!`.green);

                                target.drops.items.forEach((i) => {
                                    if(chance(i.chance)) {
                                        const loot = state.itemRepository.generate(state.itemRepository.find(i.item));
                                        player.inventory.add(loot);
                                        client.log(`You receive ${loot.fullName()}.`);
                                    }
                                });

                                target.drops.blueprints.forEach((i) => {
                                    if(chance(i.chance)) {
                                        const loot =  state.itemRepository.generate(state.itemRepository.find(i.item, {blueprint: true}));
                                        player.inventory.add(loot);
                                        client.log(`You receive ${loot.fullName()} blueprint.`);
                                    }
                                });

                                if(chance(50)) {
                                    const drop = range(0, target.goldDrop);
                                    client.log(`You receive ${drop} gold.`);
                                    client.player.gold+=drop;
                                }
                                
                                player.area.encounters.remove(target);
                                player.target = false;
                                
                            }
                            if(player.vitals.health <= 0) {
                                client.log(`${target.name} killed you!`.red);
                                player.vitals.die();
                            }
                        }
                    }
                }
            });
            nextAttack = now + config.COMBAT_SPEED;
        }
    });
};