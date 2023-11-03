//connect to server and retain the socket
//connect to same host that served the document

//const socket = io('http://' + window.document.location.host)
const socket = io() //by default connects to same server that served the page
//beforeUsernameScreen()
var socket_username = ''

socket.on('serverSays', function(message) {
  if (socket_username === '') {return;} //makes sure only to recieve messages once fully connected.

  let msgDiv = document.createElement('div')
  msgDiv.textContent = message

  /*
  What is the distinction among the following options to set
  the content? That is, the difference among:
  .innerHTML, .innerText, .textContent
  */
  //msgDiv.innerHTML = message
  //msgDiv.innerText = message
  const [s, m] = message.split(': ');
  console.log(s);
  if (s === socket_username) {
    // Message sent by you (the current socket)
    msgDiv.style.background = '#ccebff'; // Add a CSS class for sent messages
    msgDiv.style.marginLeft= '60px'; 
} else {
    // Message received from another socket
    msgDiv.style.background = '#808080'; // Add a CSS class for sent messages
    msgDiv.style.marginRight= '60px'; 

}

  document.getElementById('messages').appendChild(msgDiv)
})

// function beforeUsernameScreen() {
//   document.getElementById('title').style.display = 'none'
//   document.getElementById('messages').style.display = 'none'
//   document.getElementById('msgBox').style.display = 'none'
//   document.getElementById('send_button').style.display = 'none'
//   document.getElementById('clear_button').style.display = 'none'


// }

function afterUsernameScreen() {

  document.getElementById('title').style.display = 'block'
  document.getElementById('messages').style.display = 'block'
  document.getElementById('msgBox').style.display = 'block'
  document.getElementById('send_button').style.display = 'block'
  document.getElementById('clear_button').style.display = 'block'

  document.getElementById('welcome').style.display = 'none'
  document.getElementById('usernamebox').style.display = 'none'
  document.getElementById('send_username_button').style.display = 'none'
  document.getElementById('error').style.display = 'none'


}

function clearButton() {
  document.getElementById('messages').replaceChildren();

}

function usernameCheck(username) {

  // str1 = "1momo"            -> false
  // str2 = "mohamad radaideh" -> false
  // str3 = "momo"             -> true
  // str4 = "!@#$%^&*()_+{}"   -> false

  // if (!(username.indexOf(' ') >= 0) || username === '' || !username) {
  //   return false;
  // }
  
  //check if username starts with letter
  // result = (str) => str.length === 1 && str.match(/[a-z]/i);
  // if (!result(username.charAt(0))) {
  //   return false;
  // }

  //check if name has only numbers and letters
  for (let i = 0; i < username.length; i++) {
    let value = username.charCodeAt(i)

    
    //check if character is a number (0...9)
    if (48 <= value && value <= 57) {
      if (i === 0) {
        return false;
      }
      continue
    }

    //check if it is a capital letter (A, B C ..)
    else if (65 <= value && value<= 90) {
      continue;
    }

    //check if it is a lowercase letter (a, b c ..)
    else if (97 <= value && value <= 122) {
      continue;
    }

    else {
      return false;
    }
  }

  return true
  
}

function sendMessage() {
  let message = document.getElementById('msgBox').value.trim()
  if(message === '') return //do nothing
  socket.emit('clientSays', message, socket_username)
  document.getElementById('msgBox').value = ''
}

//function which allows username to be entered and sent.
function submitUsername() {
  let username = document.getElementById('usernamebox').value.trim()
  //if(username === '') return //do nothing
  if (username === '') {
    document.getElementById('usernamebox').value = ''
    return;
  }
  if (usernameCheck(username) === false) {
    document.getElementById('usernamebox').value = ''
    document.getElementById('error').style.display = 'block'

    return;
  }
  afterUsernameScreen()
  socket_username = username
  console.log("USERNAME: " + socket_username + "CONNECTED")

  document.getElementById('usernamebox').value = ''
}


function handleKeyDown(event) {
  const ENTER_KEY = 13 //keycode for enter key
  if (event.keyCode === ENTER_KEY) {

    if (socket_username === '') {
      //lets ENTER key to be used for username input.
      submitUsername();
      return false;
    }

    else {
      sendMessage()
      return false //don't propogate event
    }
    
  }
}


//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page

  //add listener to buttons
  document.getElementById('send_button').addEventListener('click', sendMessage)
  document.getElementById('send_username_button').addEventListener('click', submitUsername)
  document.getElementById('clear_button').addEventListener('click', clearButton)
  
  //add keyboard handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  //document.addEventListener('keyup', handleKeyUp)
})
