//KEY CODES
//should clean up these hard-coded key codes
const ENTER = 13
const RIGHT_ARROW = 39
const LEFT_ARROW = 37
const UP_ARROW = 38
const DOWN_ARROW = 40
let word_order = [];
words = [];
let result = []
function handleKeyDown(e) {

  //console.log("keydown code = " + e.which)

  let dXY = 5; //amount to move in both X and Y direction
  if (e.which == UP_ARROW && movingBox.y >= dXY)
    movingBox.y -= dXY //up arrow
  if (e.which == RIGHT_ARROW && movingBox.x + movingBox.width + dXY <= canvas.width)
    movingBox.x += dXY //right arrow
  if (e.which == LEFT_ARROW && movingBox.x >= dXY)
    movingBox.x -= dXY //left arrow
  if (e.which == DOWN_ARROW && movingBox.y + movingBox.height + dXY <= canvas.height)
    movingBox.y += dXY //down arrow

  let keyCode = e.which
  if (keyCode == UP_ARROW | keyCode == DOWN_ARROW) {
    //prevent browser from using these with text input drop downs
    e.stopPropagation()
    e.preventDefault()
  }

}

function handleKeyUp(e) {
//  console.log("key UP: " + e.which)
  if (e.which == RIGHT_ARROW | e.which == LEFT_ARROW | e.which == UP_ARROW | e.which == DOWN_ARROW) {
    let dataObj = {
      x: movingBox.x,
      y: movingBox.y
    }
    //create a JSON string representation of the data object
    let jsonString = JSON.stringify(dataObj)
    //DO NOTHING WITH THIS DATA FOR NOW


  }
  if (e.which == ENTER) {
    handleSubmitButton() //treat ENTER key like you would a submit
    document.getElementById('userTextField').value = ''

  }

  e.stopPropagation()
  e.preventDefault()

}

//problem 2.
function handleSubmitButton() {

  let userText = document.getElementById('userTextField').value
  if (userText && userText != '') {

    //problem 4.
    let textDiv = document.getElementById("text-area")
    textDiv.innerHTML = ``;
    document.getElementById("text-area").style.color = 'black'
	  textDiv.innerHTML = textDiv.innerHTML + `<p> ${userText}</p>`
    //textDiv.innerHTML = textDiv.innerHTML.style.color = `black`;

    let userRequestObj = {text: userText}
    let userRequestJSON = JSON.stringify(userRequestObj)
    document.getElementById('userTextField').value = ''
    //alert ("You typed: " + userText);

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        
        console.log("data: " + this.responseText)
        console.log("typeof: " + typeof this.responseText)

        

        //we are expecting the response text to be a JSON string
        let responseObj = JSON.parse(this.responseText)
        

        if (responseObj.text.includes("NOT FOUND:")) {
          movingString.word = "NOT FOUND"
        }
        else {
          movingString.word = "FOUND"
          result = [];
          words = [];
          word_order = [];
          const lyrics = responseObj.songLines
          //pushing words into canvas and randomizing location
          if (lyrics.length == 1) {
            contains_spaces = lyrics[0].indexOf(' ') >= 0;
            if (!contains_spaces) {
              for (let i = 0; i < lyrics.length; i ++) {

                const words_in_line = lyrics[i].split("");
    
                for (let j = 0; j < words_in_line.length; j++) {
    
                    words.push({word: words_in_line[j], x: 50, y: 50})
                    word_order.push(words_in_line[j])
                }
              }
              
              randomLocation(words)
              drawCanvas()
              return;
            }
          }
          
          
          
          for (let i = 0; i < lyrics.length; i ++) {

            const words_in_line = lyrics[i].split(" ");

            for (let j = 0; j < words_in_line.length; j++) {

                words.push({word: words_in_line[j], x: 50, y: 50})
                word_order.push(words_in_line[j])
            }
          }
          
          randomLocation(words)

        }
        
        
        drawCanvas()
      }
      

    }
    xhttp.open("POST", "userText") //API .open(METHOD, URL)
    xhttp.send(userRequestJSON) //API .send(BODY)
  }
}

//determines if current coordinates of words[] list is in order of puzzle file
function solvePuzzle() {
  let textDiv = document.getElementById("text-area")
    textDiv.innerHTML = ``;
    
    puzzle_check(words)
    let text = '';
    for (let i = 0; i < result.length; i++) {
      if (result[i] == "") {
        textDiv.innerHTML = textDiv.innerHTML + `<p> ${text} </p>`
        textDiv.innerHTML = textDiv.innerHTML + `<p></p>`
        text = ""
        continue
      }
      text = text + result[i]['word'] + " "
    }
    textDiv.innerHTML = textDiv.innerHTML + `<p> ${text} </p>`

}


const yPadding = 20;
//function that sorta by Y cord
function sortByCoordinatesY(a, b) {
  if (a.y === b.y) {
      return a.x - b.x;
  }
  return a.y - b.y;
}
//function that sorta by x cord
function sortByCoordinatesX(a, b) {
  if (a.x === b.x) {
      return a.y - b.y;
  }
  return a.x - b.x;
}

//function sees if our current orientation of words on canvas matches the order in the puzzle file.
function puzzle_check(attempt) {
  sorted_attempt = attempt
  sorted_attempt.sort(sortByCoordinatesY)
  result = []
  let tmp = []
  let counter = 0;
  
  for (let i = 0; i < sorted_attempt.length; i++ ) {
     
      if (counter > 0) {
  
          if (Math.abs(sorted_attempt[i]["y"] - sorted_attempt[i-1]["y"]) > 15) { //current word is at a much different line
              if (counter!=1){result.push("")}; //adding new line
              result.push(...tmp);
              
              tmp = [];
              counter = 0;
          }
  
          else {
              tmp.push(sorted_attempt[i])
              tmp.sort(sortByCoordinatesX)
              counter++;
          }
          
  
          
      }
      if (counter == 0) {
          tmp.push(words[i])
          counter++
      }
     
  }
  result.push("")
  result.push(...tmp);
  sorted_attempt.sort(sortByCoordinatesX)
  attempt_output = []
  for (let i = 0; i < result.length; i++) {
    //console.log(result[i]['word'])
    if (result[i] == "") {continue;}
    attempt_output.push(result[i]['word'])

  }
  
  for (let i = 0; i < word_order.length; i++) {
    if (word_order[i] != attempt_output[i]){
      document.getElementById("text-area").style.color = 'red'
      break
    }
    if (i === word_order.length - 1) {
      document.getElementById("text-area").innerHTML = ""

      document.getElementById("text-area").style.color = 'green'
    }
  }


  
}
