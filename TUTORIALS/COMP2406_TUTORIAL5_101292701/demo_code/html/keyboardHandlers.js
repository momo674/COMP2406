//KEY CODES
//should clean up these hard coded key codes
const RIGHT_ARROW = 39
const LEFT_ARROW = 37
const UP_ARROW = 38
const DOWN_ARROW = 40

function handleKeyDown(e) {
  console.log("keydown code = " + e.which);

  let dXY = 5; //amount to move in both X and Y direction
  if (e.which == UP_ARROW && movingBox.y >= dXY) movingBox.y -= dXY; //up arrow
  if (
    e.which == RIGHT_ARROW &&
    movingBox.x + movingBox.width + dXY <= canvas.width
  )
    movingBox.x += dXY; //right arrow
  if (e.which == LEFT_ARROW && movingBox.x >= dXY) movingBox.x -= dXY; //left arrow
  if (
    e.which == DOWN_ARROW &&
    movingBox.y + movingBox.height + dXY <= canvas.height
  )
    movingBox.y += dXY; //down arrow

  //upate server with position data
  //may be too much traffic?
  let dataObj = {
    x: movingBox.x,
    y: movingBox.y
  }
  //create a JSON string representation of the data object
  let jsonString = JSON.stringify(dataObj)

  socket.emit('blueBoxData', jsonString)

}


function handleKeyUp(e) {
  console.log("key UP: " + e.which)
  let dataObj = {
    x: movingBox.x,
    y: movingBox.y
  }
  //create a JSON string representation of the data object
  let jsonString = JSON.stringify(dataObj)


    socket.emit('blueBoxData', jsonString)

}
