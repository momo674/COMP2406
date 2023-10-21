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

  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("data: " + this.responseText)
      console.log("typeof: " + typeof this.responseText)
      //we are expecting the response text to be a JSON string
      let locationData = JSON.parse(this.responseText)
      movingBox.x = locationData.x
      movingBox.y = locationData.y
    }
  }
  xhttp.open("POST", "positionData") //API: .open(METHOD, URL)
  xhttp.send(jsonString) //API: .send(BODY)

}
