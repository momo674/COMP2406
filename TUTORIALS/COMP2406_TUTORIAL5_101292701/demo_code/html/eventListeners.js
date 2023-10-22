document.addEventListener('DOMContentLoaded', function() {

  //add mouse down listener to our canvas object
  document.getElementById('canvas1').addEventListener('mousedown', handleMouseDown)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)

  const DURATION_MILLISECONDS = 100
  timer = setInterval(handleTimer, DURATION_MILLISECONDS)
  pollingTimer = setInterval(pollingTimerHandler, DURATION_MILLISECONDS)
  //clearTimeout(timer) //to stop

  drawCanvas()

})
