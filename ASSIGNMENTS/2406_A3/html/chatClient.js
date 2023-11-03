//connect to server and retain the socket
//connect to same host that served the document

//const socket = io('http://' + window.document.location.host)
const socket = io() //by default connects to same server that served the page

var socket_username = ''
console.log("USERNAME: " + socket_username + " CONNECTED")
socket.on('serverSays', function(message) {
  let msgDiv = document.createElement('div')
  /*
  What is the distinction among the following options to set
  the content? That is, the difference among:
  .innerHTML, .innerText, .textContent
  */
  //msgDiv.innerHTML = message
  //msgDiv.innerText = message
  msgDiv.textContent = message
  document.getElementById('messages').appendChild(msgDiv)
})

function hideEverything() {
  document.getElementById('Connected').style.display = 'none';

  //document.getElementsByTagName("BODY").style.display = "none";
}
function sendMessage() {
  let message = document.getElementById('msgBox').value.trim()
  if(message === '') return //do nothing
  socket.emit('clientSays', message, "bob")
  document.getElementById('msgBox').value = ''
}

//function which allows username to be entered and sent.
function submitUsername() {
  let username = document.getElementById('usernamebox').value.trim()
  //if(username === '') return //do nothing
  socket_username = username
  console.log("USERNAME: " + socket_username + "CONNECTED")

  document.getElementById('usernamebox').value = ''
}


function handleKeyDown(event) {
  const ENTER_KEY = 13 //keycode for enter key
  if (event.keyCode === ENTER_KEY) {
    sendMessage()
    return false //don't propogate event
  }
}
waitForUsername();


//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page

  //add listener to buttons
  document.getElementById('send_button').addEventListener('click', sendMessage)
  document.getElementById('send_username_button').addEventListener('click', submitUsername)
  
  
  //add keyboard handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  //document.addEventListener('keyup', handleKeyUp)
})
