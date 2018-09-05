const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    //Sends to only given socket
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    //Sends to everyone but sending socket
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        //Sends to everyone
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});