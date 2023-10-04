/*
Javascript Functions -Closure
Exercise (Old Midterm): Can you explain the output?
*/

function func() {
  let n = 5
  let timesNM = function(m) {
      n = n * m
      return n
    }
  return timesNM
}

var action = func()
var action2 = func()

console.log(action(3)) //15
console.log(action(3)) //45
console.log(action2(3)) //15

//console.log(timesNM(3))  //what would be wrong with this
