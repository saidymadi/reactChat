var express = require('express');
var app = express();




users = [];
connections = [];




console.log('chat server is up and running');

app.use(express.static('./'));
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 3000;

var server = app.listen(port, () => {
  console.log('app listening on', port);
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log("connected :  %s sockets connected " + connections.length);


    socket.on('disconnect', function(socket) {

        connections.splice(connections.indexOf(socket), 1);
        console.log("disconnected one user . remaining connections  :  %s sockets connected " + connections.length);
    });


    socket.on('send message', function(data) {
        console.log('yaaay');
        io.sockets.emit('new message', { msg: data });
    });

});