// these are all in one file to ensure we can preserve the order
// if you tried to run "repo.find()" on an item that was not in place yet you would have to prefix them with numbers

/* loose schema:
    name             string: the name of the component
    chance           integer or object with {item: integer, bp: integer}: chance of finding
    skill            integer: chance the player has of building it
    attack           integer: how hard will this thing hit?
    weight           integer: how much inventory space to take up?
    attributes       array: which proceedural attributes will it get?
    inspect          string: what is printed when someone inspects an item
    parts            array: the parts needed to build this item
*/

module.exports = (repo) => ([
    // BASIC PARTS =======================================================================
    repo.add({
        name: 'piece of paper',          chance: 90,  weight: 1, attributes: ['size'],
        inspect: 'Can be used in combination with a pencil for making notes.'
    }),
    repo.add({
        name: 'pencil',                  chance: 80,  weight: 1,
        inspect: 'Can be used in combination with paper for making notes.'
    }),
    repo.add({
        name: 'fan',                     chance: 80,  weight: 1, attributes: ['size'],
        inspect: 'Dissipate heat.'
    }),
    repo.add({
        name: 'screen',                  chance: 80,  weight: 3, attributes: ['size'],
        inspect: 'Visual output for your builds.'
    }),
    repo.add({
        name: 'keypad button',          chance: 70,  weight: 1,
        inspect: 'With enough of these things you may be able to make something interesting.'
    }),
    repo.add({
        name: 'radio crystal',          chance: 10,  weight: 1,
        inspect: `It's pretty... but what does it do?`
    }),
    repo.add({
        name: 'radio transmitter',          chance: 20,  weight: 1,
        inspect: `Transmit radio frequencies.`
    }),
    repo.add({
        name: 'magnet',                  chance: 80,  weight: 1, attributes: ['size'],
        inspect: 'Detect and react to magnetic fields.'
    }),
    repo.add({
        name: 'capacitor',               chance: 5,  weight: 1,
        inspect: 'Store an electric charge.'
    }),
    repo.add({
        name: 'resistor',                chance: 5,  weight: 1,
        inspect: 'Limit the amount of current moving through a circuit.'
    }),
    repo.add({
        name: 'microcontroller',         chance: 10,  weight: 1,
        inspect: 'Used in simple electronics'
    }),
    repo.add({
        name: 'piece of scrap metal',    chance: 70,  weight: 2, attributes: ['size'],
        inspect: 'Could be used to make tools or weapons.'
    }),
    repo.add({
        name: 'LED',                     chance: 50, weight: 1, attributes: ['color'],
        inspect: 'Indicate activity or input in a simple machine.'
    }),
    repo.add({
        name: 'battery',                 chance: 25, weight: 6, attributes: ['voltage'],
        inspect: 'Provide power to your build.'
    }),
    repo.add({
        name: 'enclosure',               chance: 30, weight: 3, attributes: ['size'],
        inspect: 'Some projects require a box to contain things.'
    }),
    repo.add({
        name: 'axle',                    chance: 60, weight: 3, attributes: ['length'],
        inspect: 'Wheels spin easier when attached to an axle.'
    }),
    repo.add({
        name: 'motor',                   chance: 80, weight: 8, attributes: ['size'],
        inspect: 'Spin gears, or wheels without manual effort.'
    }),
    repo.add({
        name: 'wire',                    chance: 85, weight: 1, attributes: ['length', 'color'],
        inspect: 'Most builds require wires to connect components.'
    }),
    repo.add({
        name: 'fish',                    chance: false, weight: 1, type: 'food',
        inspect: 'Can be eaten to reduce hunger.'
    }),
    repo.add({
        name: 'apple',                   chance: 75, weight: 1, type: 'food',
        inspect: 'Can be eaten to reduce hunger.'
    }),
    repo.add({
        name: 'laser',                   chance: 10, weight: 2,
        inspect: 'Read/Write signals, or burn things.'
    }),
    repo.add({
        name: 'gear',                    chance: 30, weight: 2, attributes: ['size'],
        inspect: 'Connect gears to axles and drive wheels.'
    }),
    repo.add({
        name: 'cork',                    chance: 30, weight: 1,
        inspect: 'It floats...'
    }),
    repo.add({
        name: 'metal rod',                     chance: 40, weight: 1, attributes: ['length'],
        inspect: 'Simple iron bar.'
    }),
    repo.add({
        name: 'wheel',                   chance: 30, weight: 1, attributes: ['size'],
        inspect: 'Wheels let you move things around easier.'
    }),
    repo.add({
        name: 'wood',                    chance: 70,  weight: 1,
        inspect: 'Some builds require this simple material.'
    }),


    // COMPLEX PARTS
    repo.add({
        name: 'speaker',                 chance: { bp:60, item: 15 }, weight: 4, attributes: ['size'],
        parts: [repo.find('piece of paper'), repo.find('magnet')],
        inspect: 'Outputs sound in simple machines.'
    }),
    repo.add({
        name: 'antenna',                 chance: { bp:50, item: 10 }, weight: 2, attributes: ['length'],
        parts: [repo.find('metal rod'), repo.find('wire')],
        inspect: 'Send and receive radio signals.'
    }),
    repo.add({
        name: 'circuit board',           chance: { bp:60, item: 10 }, weight: 2, attributes: ['size'],
        parts: [repo.find('capacitor'), repo.find('capacitor'), repo.find('capacitor'), repo.find('capacitor'),
            repo.find('resistor'), repo.find('resistor'), repo.find('resistor'), repo.find('resistor'), repo.find('wire'), repo.find('wire'),
            repo.find('microcontroller')
            ],
        inspect: 'Add logic to your build.'
    }),


    // TOOLS ===================================================
    repo.add({
        name: 'screw driver',            attack:2, chance: 25, equipment: 'wield', modifiers: { skills: { assembly: 15 } },    weight: 1,
        inspect: 'Can be equipped to assist with assembly/disassembly.'
    }),
    repo.add({
        name: 'pry bar',                 attack: 8, chance: 30, equipment: 'wield', modifiers: { skills: { assembly: 5 } },     weight: 2,
        inspect: 'Brute force dissasembly.'
    }),
    repo.add({
        name: 'fishing pole',            skill: 95, chance: { bp:80, item: 50 },
        parts: [repo.find('metal rod', {length: 'very long'}), repo.find('cork'), repo.find('wire', {length: 'very long'})],
        inspect: 'Can be used to catch fish if you are near a body of water.'
    }),
    repo.add({
        name: 'high capacity cart',      skill: 7, chance: { bp:5, item: 2 }, passiveModifiers: { extra: { capacity: 40 } },
        parts: [repo.find('wheel', {size: 'large'}), repo.find('wheel', {size: 'large'}), repo.find('wheel', {size: 'large'}),
        repo.find('wheel', {size: 'large'}), repo.find('enclosure', {size: 'very large'}),
        repo.find('axle', {size: 'large'}), repo.find('axle', {size: 'large'})
        ],
        inspect: 'Provides additional inventory space. Very helpful!'
    }),
    repo.add({
        name: 'axe',                     attack: 10, skill: 90, chance: { bp:60, item: 10 }, equipment: 'wield',
        parts: [repo.find('metal rod'), repo.find('piece of scrap metal', {size: 'large'}), repo.find('wire')],
        inspect: 'Can be used to chop down trees, or dismantle items'
    }),

    // JUNK BUILDS ==============================================
    repo.add({
        name: 'busted radio',          skill: 70, chance: { bp:40, item: 15 },
        parts: [repo.find('battery'), repo.find('speaker'), repo.find('antenna'), repo.find('enclosure'), repo.find('wire'), repo.find('wire'),
            repo.find('microcontroller'), repo.find('capacitor'), repo.find('capacitor'), repo.find('resistor'), repo.find('resistor')],
        inspect: 'Seems to be broken, but contains useful parts.'
    }),
    repo.add({
        name: 'CD player',               skill: 30, chance: { bp:60, item: 30 },
        parts: [repo.find('laser'), repo.find('motor'), repo.find('gear'), repo.find('capacitor'),
            repo.find('resistor'), repo.find('resistor'), repo.find('battery')],
        inspect: 'Seems to be broken, but contains useful parts.'
    }),

    // SIMPLE MACHINES =========================================
    repo.add({
        name: 'power supply',            skill: 30, chance: { bp:30, item: 15 },
        parts: [repo.find('battery'), repo.find('enclosure'), repo.find('wire'), repo.find('microcontroller'), repo.find('capacitor'), repo.find('fan'),
            repo.find('capacitor'), repo.find('resistor'), repo.find('resistor'), repo.find('battery'), repo.find('battery'), repo.find('battery'), repo.find('battery')],
        inspect: 'Power your builds.'
    }),
    repo.add({
        name: 'blinking light',          skill: 10, attention: 30, chance: { bp:70, item: 15 },
        parts:[repo.find('LED'), repo.find('battery'), repo.find('circuit board') ],
        inspect: 'Indicate read/write opperations. Be careful - this can call attention to the area.'
    }),
    repo.add({
        name: 'drill',                   skill: 30, chance: { bp:60, item:25 }, equipment: 'wield', modifiers: { skills: { assembly: 20 } },
        parts: [ repo.find('motor', {size: 'very small'}), repo.find('gear'), repo.find('battery')],
        inspect: 'Can be equipped to assist with assembly/disassembly.'
    }),
    repo.add({
        name: 'metal detector',          skill: 20 , chance: { bp:10, item:10 },  passiveModifiers: { skills: {detection:25} },
        parts:[repo.find('blinking light'), repo.find('speaker'), repo.find('metal rod', {length: 'very long'}),
        repo.find('capacitor'), repo.find('capacitor'), repo.find('resistor'), repo.find('resistor'), repo.find('battery')],
        inspect: 'Makes spotting hidden items easier.'
    }),
    repo.add({
        name: 'generator',               skill: 50, attention: 60, chance: { bp:40, item: 10},
        parts:[repo.find('gear'), repo.find('gear'), repo.find('gear'), repo.find('metal rod'), repo.find('enclosure', {size: 'large'}),
            repo.find('magnet')
            ],
        inspect: 'Provides power to your build. Noisy!'
    }),

    // STRUCTURES ==============================================
    repo.add({
        name: 'tent',                    chance: 10,  weight: 1, placeable: true,
        inspect: 'The simplist of shelters. Place a tent and enter it to protect yourself.'
    }),


    // KEY OBJECTIVE BUILDS ====================================
    repo.add({
        name: 'compass',                 skill:0, chance: { bp:60, item: 15 }, weight: 2,
        parts: [repo.find('magnet'), repo.find('enclosure', {size: 'very small'})],
        inspect: 'Read your coordinates simply by having this in your inventory.'
    }),

    repo.add({
        name: 'walkie talkie',           skill: 40, attention: 60, chance: { bp:40, item: 10},
        parts:[repo.find('gear'), repo.find('gear'), repo.find('gear'), repo.find('metal rod'), repo.find('enclosure', {size: 'large'}), repo.find('magnet')],
        inspect: 'Communicate with others... is anyone out there?'
    }),

    repo.add({
        name: 'distress terminal',       skill: 90, attention: 60, chance: { bp:10, item: 1},
        parts:[
            repo.find('keypad button'), repo.find('keypad button'), repo.find('keypad button'), repo.find('keypad button'),
            repo.find('speaker'), repo.find('speaker'), repo.find('radio crystal'), repo.find('radio transmitter'), repo.find('screen'),
            repo.find('LED'), repo.find('LED'), repo.find('LED'), repo.find('LED'), repo.find('LED'), repo.find('LED'),
            repo.find('generator'), repo.find('antenna'), repo.find('circuit board'), repo.find('circuit board'), repo.find('circuit board'), 
            repo.find('wire'), repo.find('wire'), repo.find('wire'), repo.find('wire'), repo.find('wire'),
        ],
        inspect: 'Is anyone out there?'
    }),

    // TEST ITEMS ==============================================
    repo.add({ name: 'build tester easy',       skill: 101, chance: { bp:false, item:false}, parts:[repo.find('gear', {size: 'large'}), repo.find('enclosure', {size: 'large'}) ]}),
    repo.add({ name: 'build tester hard',       skill: 101, chance: { bp:false, item:false}, parts:[repo.find('gear', {size: 'very small'}), repo.find('enclosure', {size: 'very small'}) ]})
]);