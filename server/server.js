const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

// Connection listener
io.on('connection', (socket) => {
    console.log('New user connected');

    // Create join listener for rooms
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(params.room);

        // Remove users from previous room and add to new room
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        // Emit the update userlist to the given room
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // Sends to only given socket
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        // Sends to everyone but sending socket
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`));

        callback();
    });

    // Create message listener
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            // Sends to everyone
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
    });

    // Create location message listener
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    // Disconnect listener
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            // Update user list
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));

            // Tell everyone that a user left
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    })
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});