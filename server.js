//import from node module
const express=require('express');
const SocketIO=require("socket.io");
const http=require('http');
const hostname='0.0.0.0';
//these are extraction from above imports
const app=express();
const { Server }=SocketIO;
const httpServer=http.createServer(app);
const IO=new Server(httpServer); 
 //port
const PORT=333;
//this is middleware
app.use(express.static("client"));

function onStartFn(){
    console.log("server is up and running");
}
//onStartFn is just confirm when server is running
httpServer.listen(PORT,hostname,onStartFn);

IO.on('connection',(socket)=>{//connection is predefined event
    console.log('connection estamblish', socket.id);
    // chat message is my difined event
    socket.on('chat message',(data)=>{// I got data in my socket from client
             IO.emit('chat message', data);
    })

    socket.on('disconnect',()=>{
        console.log(socket.id,"left the chat");
    })
})