// const io = import "../"
const btn=document.getElementById("login-btn");
const form=document.querySelector(".login-form");
const chatBlock=document.querySelector(".chat-block");
const userInput=document.getElementById("user-input");
const sendBtn=document.getElementById('msg-btn');
const inputMsg=document.getElementById('user-msg');
const messageContainer=document.querySelector('.message-block');
let  socket=io();
console.log(socket);
console.log(userInput.value);
let username='';

btn.addEventListener("click",(event)=>{ 
   event.preventDefault();
  
    username=userInput.value;
    if(username!==''){
        form.style.display="none";
        chatBlock.style.display="block"
       
    }
})
sendBtn.addEventListener("click", event=>{
    event.preventDefault();
    //I am emmiting data through this event
    let data={
        id: socket.id,
        message: inputMsg.value,
        username: username,
    }
    socket.emit('chat message',data);
   appendMessage(data,'SEND');
})
socket.on('chat message', data=>{
    if(data.id!==socket.id){
        appendMessage(data,'RECIEVED');
    }
})
function appendMessage(data, type){
  var msgDiv=document.createElement('div');
  msgDiv.innerHTML=`${data.username}:${data.message}`;
  if(type=='SEND'){
    msgDiv.setAttribute('class','msg msg-send');
  }
  else{
    msgDiv.setAttribute('class','msg msg-recive');
  }
  messageContainer.append(msgDiv);
  inputMsg.value='';
}
