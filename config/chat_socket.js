module.exports.chatSockets = function(socketServer){
    // io will be handling the connections
    let io = require('socket.io')(socketServer); 
    
    io.sockets.on('connection', function(socket){
        console.log('New Connection received', socket.id);
        
        socket.on('disconnect', function(){
            console.log('connection dissconnected');
        })
    })
}