var express = require('express');
var app = express();

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
  console.log("server is  listining on port "+port);
});


//in this simple server I am emmitting everything to every connected socket

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    connections.push(socket);
   console.log("connected one user . connections count : " + connections.length);
    
    socket.on('disconnect', function(socket) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("disconnected one user . remaining connections  : " + connections.length);
    });

    socket.on('killServer', function(data) {
        //disconnect all sockets
        console.log("sorry, we are disconnecting you because User (" +data.name+") begged us to disconnect. take it up with (him/her)");
        
        
        users = [];
        msgs = [];
        connections = [];
        //disconnect server
        server.close();

        //TODO This is just a hacky way to kill the server 
        //the following is not an actual method and will crash the server (to mimic forced disconnection)
        io.sockets.crashByThrowingAnError();
    });

    socket.on('reqChatHistory', ()=> { 
        console.log("someone requested the history" + msgs.length);   
        io.sockets.emit('responseChatHistory',  {msgs : msgs, users : users});
    });

    socket.on('addUser', function(data) {
        let userExists =  users.some((user)=>{
                  return user.name == data.name;
         });
        if(userExists){
            io.sockets.emit('errorOnAddingUser',data);
        }
        else{
            users.push(data);
            io.sockets.emit('userAdded',data);
        }
    });

    socket.on('addMsg', function(data) {   
        msgs.push(data);
        io.sockets.emit('msgAdded', data);
    });



});