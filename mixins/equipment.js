const events = require('../lib/events');
const Item = require('../classes/Item');

const check = (self, slot) => {
    const found = self.inventory.items.find((i) => {
        return i.equipment === slot && i.equipped;
    })
    if(found) return found;
    return false;
};

module.exports = (self) => ({
    equipment: {
        wield: () => {
            const exists = check(self, 'wield');
            if(exists) {
                return exists;
            } else {
                return new Item({name: 'Bare Hands' });
            }
        },

        helmet: () => {
            const exists = check(self, 'helmet');
            if(exists) {
                return exists;
            } else {
                return new Item({name: 'None' });
            }
        },

        armor: () => {
            const exists = check(self, 'armor');
            if(exists) {
                return exists;
            } else {
                return new Item({name: 'None' });
            }
        }
    }
});