/*
(c) 2022 LD Nel

Javasript to handle mouse dragging and release
to drag a string around the html canvas

Keyboard arrow keys are used to move a moving box around
Keyboard keyDown handler is being used to move a "moving box" around

Notice in the .html source file there are no pre-attached handlers.
*/

//connect to server and retain the socket
//connect to the same host that served the html document

socket = io();

socket.on('blueBoxData', function(data) {
  console.log("data: " + data)
  console.log("typeof: " + typeof data)
  let locationData = JSON.parse(data)
  movingBox.x = locationData.x
  movingBox.y = locationData.y
  drawCanvas()
})
//Use local javascript array of objects to represent words and their locations
const words = []
words.push({ word: "I", x: 50, y: 50 })
words.push({ word: "like", x: 70, y: 50 })
words.push({ word: "the", x: 120, y: 50 })
words.push({ word: "way", x: 170, y: 50 })
words.push({ word: "your", x: 230, y: 50 })
words.push({ word: "sparkling", x: 300, y: 50 })
words.push({ word: "earrings", x: 430, y: 50 })
words.push({ word: "lay", x: 530, y: 50 })

let movingString = {
  word: "Moving",
  x: 100,
  y: 100,
  xDirection: 1, //+1 for leftwards, -1 for rightwards
  yDirection: 1, //+1 for downwards, -1 for upwards
  stringWidth: 50, //will be updated when drawn
  stringHeight: 24
} //assumed height based on drawing point size

//intended for keyboard control
let movingBox = {
  x: 50,
  y: 50,
  width: 100,
  height: 100
}

let timer //used to control the free moving word
let pollingTimer //timer to poll server for location updates

let wordBeingMoved //word being dragged by mouse
let wordTargetRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
} //bounding box around word being targeted

let deltaX, deltaY //location where mouse is pressed
let canvas = document.getElementById("canvas1") //our drawing canvas
const fontPointSize = 18 //point size for word text
const wordHeight = 20 //estimated height of a string in the editor
const editorFont = "Arial" //font for your editor







function getWordAtLocation(aCanvasX, aCanvasY) {
  //locate the word targeted by aCanvasX, aCanvasY
  //find a word whose bounding box contains location (aCanvasX, aCanvasY)

  const context = canvas.getContext("2d");

  for (let i = 0; i < words.length; i++) {
    let wordWidth = context.measureText(words[i].word).width
    if (
      aCanvasX > words[i].x &&
      aCanvasX < words[i].x + wordWidth &&
      (aCanvasY > words[i].y - wordHeight && aCanvasY < words[i].y)
    ) {
      //set word targeting rectangle for debugging display
      wordTargetRect = {
        x: words[i].x,
        y: words[i].y - wordHeight,
        width: wordWidth,
        height: wordHeight
      }
      return words[i] //return the word found
    }
  }
}

function drawCanvas() {
  const context = canvas.getContext("2d");

  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height); //erase canvas

  context.font = "" + fontPointSize + "pt " + editorFont;
  context.fillStyle = "cornflowerblue";
  context.strokeStyle = "blue";

  for (let i = 0; i < words.length; i++) {
    let data = words[i]
    context.fillText(data.word, data.x, data.y);
    context.strokeText(data.word, data.x, data.y);
  }

  movingString.stringWidth = context.measureText(movingString.word).width;
  context.fillText(movingString.word, movingString.x, movingString.y);

  //draw moving box
  context.fillRect(movingBox.x, movingBox.y, movingBox.width, movingBox.height);

  //draw circle
  context.beginPath()
  context.arc(
    canvas.width / 2, //x co-ord
    canvas.height / 2, //y co-ord
    canvas.height / 2 - 5, //radius
    0, //start angle
    2 * Math.PI //end angle
  )
  context.stroke()

  //draw box around word last targeted with mouse -for debugging
  context.strokeStyle = "red";
  context.strokeRect(
    wordTargetRect.x,
    wordTargetRect.y,
    wordTargetRect.width,
    wordTargetRect.height
  )
}

