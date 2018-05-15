const config = require('../config');
const events = require('../lib/events');
const Player = require('../classes/Player');
module.exports = (self) => ({
    x: 0,
    y: 0,
    moveBy: (x, y) => {
        if(self.vitals.resting) {
            self.client.log('You are resting...');
            return false;
        }
        if(self.vitals.stamina<=0) {
            self.client.log('You are too tired to move. Try resting');
            return false;
        } else {
            self.vitals.stamina-=config.STAMINA_PER_MOVE;
            return self.setPosition(self.x + x, self.y + y)
        }
    },
    setPosition: (x, y) => {
        events.emit('player_left_area', self.client, self.x, self.y);// todo: bug- assumes this is a player.. wont work with npcs
        self.x = x;
        self.y = y;      
        events.emit('player_entered_area', self.client, self.x, self.y); // todo: bug- assumes this is a player.. wont work with npcs
        events.emit('move', self);

        return true;
    }
});