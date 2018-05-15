const events = require('../lib/events');
const config = require('../config');

module.exports = (self) => ({
    vitals: {
        health: 100,
        healthMax: 100,
        hunger: 0,
        hungerTick: 0,
        stamina: 100,
        staminaTick: 0,
        resting: false,
        // takeDamage(value) {
        //     self.vitals.health -= value;
        //     if(self.vitals.health <= 0) {
        //         self.vitals.die();
        //     }
        //     events.emit('damage', self, null, 'hunger');
        // },
        // healthMax:() => {
        //     return 100;
        // },
        eat:() => {
            self.hunger = Math.max(self.vitals.hunger+config.HUNGER_PER_EAT, 0); // todo: each item should be able to influence stamina differently
            events.emit('eat', self);
        },
        rest:() => {
            if(self.vitals.resting) {
                self.client.log('You are already resting.');
                return false;
            }

            events.emit('rest_start', self.client);
            self.client.log('You begin to rest.');

            self.vitals.resting = setTimeout(() => {                
                if(self.shelter) {
                    self.vitals.stamina = Math.min(self.vitals.stamina + config.STAMINA_PER_REST_SHELTERED, 100);
                    self.client.log(`You feel more rested. (+${config.STAMINA_PER_REST_SHELTERED}) (sheltered)`);
                } else {
                    self.vitals.stamina = Math.min(self.vitals.stamina + config.STAMINA_PER_REST, 100);
                    self.client.log(`You feel more rested. (+${config.STAMINA_PER_REST})`);
                }
                self.vitals.resting = false;
                events.emit('rest_end', self.client);
            }, config.REST_TIME);
        },
        die() {
            self.client.log('You have died!');
            self.client.log(`You will lose all of your items and be moved to a new location.`);
            self.vitals.health = self.vitals.healthMax;
            self.inventory.clear();
            self.setPosition(range(config.STARTING_X_MIN, config.STARTING_X_MAX), range(config.STARTING_Y_MIN, config.STARTING_Y_MAX));
        }
    }
});