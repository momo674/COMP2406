
document.addEventListener('DOMContentLoaded', function() {
  //This is called after the browser has loaded the web page

  //add mouse down listener to our canvas object
  document.getElementById('canvas1').addEventListener('mousedown', handleMouseDown)
  //add listener to submit button
  document.getElementById('submit_button').addEventListener('click', handleSubmitButton)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)

  timer = setInterval(handleTimer, 100)


  drawCanvas()
})
