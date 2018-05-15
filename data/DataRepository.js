// does not extend Repository...

const config = require('../config');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');

const dbPath = path.resolve(__dirname, './db.db');
const sequelize = new Sequelize(null, null, null, { dialect: 'sqlite', storage: dbPath, logging:false});

const Item = require('../classes/Item');
const Landmark = require('../classes/Landmark');
const Area = require('../classes/Area');
const Structure = require('../classes/Structure');

const instanceMapper = (json, classDef) => {
    const items = [];
    const collection = JSON.parse(json);
    if(collection) {
        collection.forEach((i) => {
            items.push(new classDef(i));
        });
    }
    return items;
};

class DataRepository {
    constructor(state) {
        this.state = state;
        this.tables = {};
    }

    load() {
        this.tables.account = sequelize.define('account', {
            id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true},
            name: Sequelize.STRING,
            password: Sequelize.STRING
        });

        this.tables.character = sequelize.define('character', {
            id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true},
            account: Sequelize.INTEGER,
            name: Sequelize.STRING,            
            class: Sequelize.STRING,
            vitals: Sequelize.STRING,
            inventory: Sequelize.STRING,
            gold: Sequelize.INTEGER,
            records: Sequelize.STRING,
            x: Sequelize.INTEGER,
            y: Sequelize.INTEGER,
            logins: Sequelize.INTEGER,
            admin: Sequelize.INTEGER
        });

        this.tables.area = sequelize.define('area', {
            id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true},
            name: Sequelize.STRING,  
            x: Sequelize.INTEGER,  
            y: Sequelize.INTEGER,  
            inventory: Sequelize.STRING,  
            landmarks: Sequelize.STRING,  
            encounters: Sequelize.STRING
        });

        this.loadAreas();
    }

    nameExists(table, name, callback) {
        this.tables[table].find({where: {name}}).then((result) => {
            callback(!!result);
        });
    }

    createAccount(name, password, callback) {
        const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        this.tables.account.create({name, password: hashedPass}).then(callback);
    }

    createCharacter(name, classType, account, callback) {
        const found = this.state.classRepository.find(classType);
        const inventory = found.obj.data.startingItems.map((i) => {
            return this.state.itemRepository.resolve(i);
        });
        const x = range(config.STARTING_X_MIN, config.STARTING_X_MAX);
        const y = range(config.STARTING_Y_MIN, config.STARTING_Y_MAX);
        const area = this.state.areaRepository.get(x, y);
        area.encounters.add(this.state.structureRepository.find('cryogenic bed', {owner: name}));
        this.tables.character.create({name, class: classType, x, y, inventory: JSON.stringify(inventory), account}).then((results) => {
            callback(results);
        });
    }

    auth(name, password, callback) {
        this.tables.account.find({where: {name}}).then((result) => {
            if(result && result.dataValues) {
                const pass = bcrypt.compareSync(password, result.dataValues.password);
                if(pass) {
                    callback({success: true, account: result.dataValues.id});
                } else {
                    callback({success: false});
                }
            } else {
                callback({success: false});
            }
        });
    }

    getCharacters(account, callback) {
        this.tables.character.findAll({where: {account}}).then((results) => {
            const characters = [];
            results.forEach((row) => {
                characters.push({id: row.dataValues.id, name: row.dataValues.name});
            });
            callback(characters);
        });
    }

    loadCharacter(id, callback) {
        this.tables.character.find({where: {id}}).then((results) => {
            const data = results.dataValues;
            const instance = this.state.classRepository.cast(data.class);

            Object.assign(instance.skills, JSON.parse(data.skills || '{}'));
            Object.assign(instance.vitals, JSON.parse(data.vitals || '{}'));
            Object.assign(instance.records, JSON.parse(data.records || '[]'));

            instance.inventory.items = instanceMapper(data.inventory, Item);

            instance.id = data.id;
            instance.x = data.x;
            instance.y = data.y;
            instance.name = data.name;
            instance.logins = data.logins;
            instance.admin = data.admin;
            instance.gold = data.gold;
            callback(instance);
        });
    }

    saveCharacter(client, callback=function(){}) {
        this.tables.character.update({
            x: client.player.x,
            y: client.player.y, 
            skills: JSON.stringify(client.player.skills),
            vitals: JSON.stringify(client.player.vitals),
            inventory: JSON.stringify(client.player.inventory.items),
            records: JSON.stringify(client.player.records),
            logins: client.player.logins,
            admin: client.player.admin,
            gold: client.player.gold
        }, {where: {id: client.player.id}});
    }

    loadAreas(x, y, callback) {
        this.tables.area.findAll().then((results) => {
            if(results.length) {
                this.state.areaRepository.collection = [];
                results.forEach((row) => {
                    const data = row.dataValues;

                    const newArea = new Area({});
                    
                    newArea.inventory.items = instanceMapper(data.inventory, Item);
                    newArea.encounters.landmarks.items = instanceMapper(data.landmarks, Landmark);

                    newArea.x = data.x;
                    newArea.y = data.y;
                    newArea.name = data.name;
                    this.state.areaRepository.collection.push(newArea);
                });
            }
        });
    }

    saveArea(props, callback=function(){}) {
        const payload = {
            x: props.x,
            y: props.y,
            inventory: JSON.stringify(props.inventory.items),
            encounters: JSON.stringify(props.encounters.items),
        }
        this.tables.area.find({where: {x: props.x, y: props.y}}).then((results) => {
            if(results) {
                this.tables.area.update(payload, {where: {x: props.x, y: props.y}});
            } else {
                this.tables.area.create(payload);
            }
        }); 
    }

    saveAll() {
        this.state.game.clients.forEach((client) => {
            if(client.player) this.saveCharacter(client);
        });

        this.state.areaRepository.collection.forEach((area) => {
            this.saveArea(area);
        });
    }

    truncate() {
        this.tables.area.destroy({
            where: {
                id:{
                    [Sequelize.Op.ne]: null
                }
            }
        });
        this.tables.character.update({
            inventory: '[]'
        }, {
            where: {
                id:{
                    [Sequelize.Op.ne]: null
                }
            }            
        });
    }
}

module.exports = DataRepository;