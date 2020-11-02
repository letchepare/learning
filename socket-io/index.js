var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


// Map of <id, pseudo> containing users
var online = new Map()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        var pseudo = socket.id;
        console.log('user disconnected', socket.id);
        online.delete(socket.id)
        io.emit('chat message', { userName: 'system', message: `${pseudo} is now offline` })
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log(msg)
        io.emit('chat message', msg);
    });
    socket.on('connected', (pseudo) => {
        socket.id = pseudo;
        online.set(socket.id, pseudo);
        console.log(online)
        io.emit('chat message', { userName: 'system', message: `${pseudo} is now online` })
    })
});

app.use('/static', express.static(__dirname + '/assets'));


http.listen(3000, () => {
    console.log('listening on *:3000');
});


module.exports = app
