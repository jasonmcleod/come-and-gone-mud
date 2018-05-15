// websocket to support web browsers
const Client = require('../classes/Client');
const config = require('../config');
module.exports = (state) => {
    const express = require('express');
    const app = express();
    const http = require('http').Server(app);
    const io = require('socket.io')(http);

    http.listen(config.WEB_PORT, () => console.log('web server listening on port 3000'));
    app.use(express.static('web'));

    app.get('/', function(req, res){ res.sendFile(__dirname + '/index.html'); });

    io.on('connection', function(socket) {
        const client = state.game.connect();
        client.webSocket = socket;
        client.setContext('pregame');

        socket.on('cmd', (data) => {
            state.commandRepository.execute(client, data, state);
        });

        socket.on('disconnect', function() {
            state.dataRepository.saveAll();
        });
    });
};