
/*
Example of ASYNCHRONOUS file read.
Function readFile does not block (wait) for the file to be read.

Instead its argument function(err,data) will be called once the file has been read.
function(err,data) is the "call back" function that will be called when readFile's task is done.

Notice "DONE" gets written to the console before the file contents. Make
sure you understand why that is.
*/


const fs = require('fs')

fs.readFile('songs/sister_golden_hair.txt', function(err, data) {
  if(err) throw err
  let array = data.toString().split("\n")
  
  for(let line of array) {

    const notes = []
    const notes_index = []
    let notes_line = ""
    let x = line.indexOf("[")
    let note = "";

  
    while (x != -1) {
      let save = x;

      
      let selected_char = line.charAt(++x);
      

      while (selected_char != "]") {
        note+=selected_char;
        x++;
        selected_char = line.charAt(x)
      }
      notes.push(note)
      note = "[" + note + "]"

      if (line.charAt(save) == " ") {
        save+=1
      }
      notes_index.push(save + 1)
      
      
      
      line = line.replace(note, "")
      x = line.indexOf("[")
      note = ""
      
      
      
      
      
      
    }
    
   notes_line = " ".repeat(line.length)
   for (let i = 0; i < notes.length; i++) {
    if (notes_line.charAt(notes_index[i] - 1) != " ") {
      let prevnote = notes[i-1]
      notes_line = notes_line.slice(0,notes_index[i - 1] + prevnote.length) + notes[i] + notes_line.slice(notes_index[i - 1] + prevnote.length)
    }
    else {
      notes_line = notes_line.slice(0,notes_index[i] - 1) + notes[i] + notes_line.slice(notes_index[i] - 1)
    }
   
   } 

    
  
   console.log(notes_line)
    console.log(line + "\n")

    
  }


console.log("DONE")
})