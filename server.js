var express = require('express');
var app = express();

const ADD_MESSAGE = 'ADD_MESSAGE';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const ADD_USER = 'ADD_USER';
const RECEIVE_USER = 'RECEIVE_USER';
const SELECT_USER = 'SELECT_USER';



//cache results on the server 
//Ideally in a full stack you'd use some DB ... 
users = [];
msgs = [];
connections = [];




console.log('chat server is up and running');

app.use(express.static('./'));
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 3000;

var server = app.listen(port, () => {
  
});


var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    connections.push(socket);


    
    socket.on('disconnect', function(socket) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("disconnected one user . remaining connections  : " + connections.length);
    });

    socket.on('reqChatHistory', ()=> { 
        socket.broadcast.emit('respChatHistory',  {msgs : msgs, users : users});
    });

    socket.on('addUser', function(data) {
        console.log(data);   
        users.push(data);
        io.sockets.emit('userAdded',data);
    });

    socket.on('addMsg', function(data) {   
        msgs.push(data);
        io.sockets.emit('msgAdded', data);
    });



});