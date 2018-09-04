var socket = io(); //Opening request from client to server

//Connecting to server
socket.on('connect', function () {
    console.log('Connected to server');
});

//Disconnecting to server
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

//New message listener
socket.on('newMessage', function (message) {
    console.log('New message', message);
});