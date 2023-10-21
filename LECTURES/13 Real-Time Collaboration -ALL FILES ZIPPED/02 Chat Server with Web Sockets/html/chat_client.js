
  //connect to web socket server at the
  //same host that provided the webpage
  const url = 'ws://' + window.document.location.host
  console.log('ws url: ' + url)
  let ws = new WebSocket(url)
  ws.onmessage = function(message) {
    //receive incoming message on web socket

    let msgDiv = document.createElement('div')
    /*
    What is the distinction among the following options to set
    the content? That is, the difference among:
    .innerHTML, .innerText, .textContent
    */
    //msgDiv.innerHTML = message.data
    //msgDiv.innerText = message.data
    msgDiv.textContent = message.data
    console.log(typeof message.data + ":" + message.data)
    document.getElementById('messages').appendChild(msgDiv)
  }

  function sendMessage() {
    let message = document.getElementById('msgBox').value
    ws.send(message)
    document.getElementById('msgBox').value = ''
  }



function handleKeyDown(event) {
  const ENTER_KEY = 13 //keyCode for enter key

  if (event.keyCode === ENTER_KEY) {
    //handle enter key
    sendMessage()
    return false //don't propogate event
  }
}

//Add event handlers to html document
document.addEventListener('DOMContentLoaded', function() {
  //This is called after the browser has loaded the web page

  //add button listeners
  document.getElementById('send_button').addEventListener('click', sendMessage)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  //document.addEventListener('keyup', handleKeyUp)

})
