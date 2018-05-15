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
                return new Item({name: 'bare hands', attack:1, });
            }
        },

        helmet: () => {
            const exists = check(self, 'helmet');
            if(exists) {
                return exists;
            } else {
                return new Item({name: 'None', protection :0 });
            }
        },

        armor: () => {
            const exists = check(self, 'armor');
            if(exists) {
                return exists;
            } else {
                return new Item({name: 'None', protection :0 });
            }
        }
    }
});