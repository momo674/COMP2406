

socket = io()
function handleTimer() {
  movingString.x = movingString.x + 5 * movingString.xDirection
  movingString.y = movingString.y + 5 * movingString.yDirection

  //keep moving word within bounds of canvas
  if (movingString.x + movingString.stringWidth > canvas.width)
    movingString.xDirection = -1
  if (movingString.x < 0) movingString.xDirection = 1
  if (movingString.y > canvas.height) movingString.yDirection = -1
  if (movingString.y - movingString.stringHeight < 0)
    movingString.yDirection = 1

  drawCanvas()
}


function pollingTimerHandler() {
  //console.log("poll server");
  let dataObj = {
    x: -1,
    y: -1
  } //used by server to react as poll
  //create a JSON string representation of the data object
  let jsonString = JSON.stringify(dataObj)

  //socket.emit('blueBoxData', jsonString)
 
}
