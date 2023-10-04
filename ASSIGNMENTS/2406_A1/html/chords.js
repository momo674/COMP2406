let notes_line_stored = []; //stores raw html lines
let notes_total = []; //stores arrays of notes at each index

function parseChordProFormat(chordProLinesArray) {
  //parse the song lines with embedded
  //chord pro chords and add them to DOM

  console.log('type of input: ' + typeof chordProLinesArray)

  //add the lines of text to html <p> elements
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = '' //clear the html

  for (let i = 0; i < chordProLinesArray.length; i++) {
    let line = chordProLinesArray[i]
    let org_line = line

    const notes = []
    const notes_index = []
    let notes_line = ""
    let x = line.indexOf("[")
    let note = "";

  
    while (x != -1) {
      let save = x;

      
      let selected_char = line.charAt(++x);
      
      //adding notes
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
      notes_index.push(save + 2)
      
      
      
      line = line.replace(note, "")
      x = line.indexOf("[")
      note = ""
    }

    notes_line = " ".repeat(line.length)
    //formatting notes
   for (let i = 0; i < notes.length; i++) {
    if (notes_line.charAt(notes_index[i] - 1) != " ") {
      let prevnote = notes[i-1]
      notes_line = notes_line.slice(0,notes_index[i - 1] + prevnote.length) + notes[i] + notes_line.slice(notes_index[i - 1] + prevnote.length)
    }
    else {
      notes_line = notes_line.slice(0,notes_index[i] - 1) + notes[i] + notes_line.slice(notes_index[i] - 1)
    }
   
   } 
   //checks if the line is empty, if so we dont add it to html file.
   if (line.trim().length == 0) {continue;}

   //adding raw html line to list
    notes_line_stored.push(notes_line);


    //updating inner html on index.html to have these new lines of notes.
    textDiv.innerHTML += `<pre id = "noteline">${notes_line}</pre>`
    textDiv.innerHTML +=  `<pre id ="normal"> ${line}</pre>`
    textDiv.innerHTML += '<br>'

    //add our current list of notes into a list.
    notes_total.push(notes);

    
  }

  
}

//lists of notes to use
let notes_sharp = ['A',	'A#', 'B',  'C', 'C#',	'D',	'D#',	'E',	'F',	'F#',	'G',	'G#']
let notes_minor = ['A'	,'Bb','B',	,'C',	'Db',	'D',	'Eb',	'E',	'F',	'Gb',	'G'	,'Ab']
let counter = 0; //which transpose we are at (how many up or down)


function transposeUp(){
  
  let elms = document.querySelectorAll("[id='noteline']");
   if (elms.length == 0) {return;}
    
    //go through all the lines and modif
    for(var i = 0; i < elms.length; i++){
      //note is changed, make it red
        elms[i].style.color='red';
        
        //list of notes (no repeats)
        let b = []
        
        //turning our current list of notes into a set, no repeats
        for (let x = 0 ; x < notes_total[i].length; x++) {
          
          if (!b.includes(notes_total[i][x])) {
            b.push(notes_total[i][x])
          }


        }
        //going through each element in our b array/set
        for (let n = 0; n < b.length; n++) {

          let cur_note = b[n]
          let new_note = transposeUpConvert(cur_note) //function turns note into next note in tranpose lists
          tmp = replaceAll(notes_total[i],cur_note,new_note); //custom function that replaces elements in array
          notes_total[i] = tmp 
          
          //replacing html notes
          if (cur_note.length == 1) { //special case if it is one letter
  
            let pattern = new RegExp(`(?<![\\/])\\b${cur_note}\\b(?![/#])`, 'g');
            
            elms[i].innerHTML = elms[i].innerHTML.replaceAll(pattern, new_note)


          }
          
          else {
            let pattern = new RegExp(`(?<!\\/|\\S)${cur_note}(?!\\/|\\S)`, 'g');

            elms[i].innerHTML = elms[i].innerHTML.replaceAll(pattern, new_note)
          }

          
        }
        
        
        
        

    }
    counter++;

    //if our counter hits 12 semitones, then we must reset it and set the current html colour to green
    if (counter % 12 == 0 && counter!=0) {
      
      counter = 0;
    }
    
    
    if (counter % 12 == 0) {
      for(var i = 0; i < elms.length; i++){
      
        elms[i].style.color='green';
        
      }
      return
    }
    
    
}
function replaceAll(arr, old, n) {
  if (arr === undefined) {return []}
  for (let i = 0; i < arr.length; i ++) {
    if (arr[i] == old) {
      arr[i] = n;
    }
  }

  return arr;
}

//function that returns a note one semitone higher than the parameter note
function transposeUpConvert(note) {
  if (note.includes('/')) { // the case if it is a double note
    let note1 = '' //the note before the /
    let note2 = '' //the note after the /
    let note1_select = true;
    for (let i = 0; i < note.length; i++) { //looping through all characters of note
      
      if (note.charAt(i) == '/') {

        note1_select = false;
        continue
      }
      if (note1_select) {
        note1+= note.charAt(i) 
      }

      else {
        note2+= note.charAt(i)
      }

    }
    note_re = transposeUpConvert(note1) + "/" + transposeUpConvert(note2); //use recurrsion to get next semtone notes
    return note_re
   }


  else if (note.includes('b')) { //the case if the note is a minor
    let note_to_change = ''; //the actual note
    let note_add_end = ''; //random stuff after, such as 7
    let final_note = ''; //the note to be returned

    for (let i = 0; i < note.length; i++) {
      let character = note.charAt(i)
      if (i == 0) {
        note_to_change += character; //adds the note
      }
      else if (i == 1 && character == 'b') { //adds the minor symbol
        note_to_change += character;
      }
      else { //extra stuff gets added at the end
        note_add_end += character;
      }
    }
  
  
    
    let index = notes_minor.indexOf(note_to_change); //get index of this note, and increment it by 1.
    index++; 
    
    
    note_to_change = notes_minor[index % 12]; //then we get the next note 
    final_note = note_to_change + note_add_end;
    return final_note;
   }
  
  else { //regular note or sharp

    let note_to_change = ''; //our main info about note
    let note_add_end = ''; //the stuff at the end
    let final_note = ''; //value to be returned
    
    if (note.length == 1) { //special case of note, it being A or B not A# or A#7
      note_to_change = note;
      let index = notes_sharp.indexOf(note_to_change);
      index++; 
    
    
      note_to_change = notes_sharp[index % 12];
      final_note = note_to_change + note_add_end;
      return final_note;
    }
    
    //regular case
    for (let i = 0; i < note.length; i++) {
      let character = note.charAt(i)
      if (i == 0) {
        note_to_change += character;
      }
      else if (i == 1 && character == '#') {
        note_to_change += character;
      }
      else {
        note_add_end += character;
      }
    }
  
  
    
    let index = notes_sharp.indexOf(note_to_change);
    index++; 
    
    
    note_to_change = notes_sharp[index % 12];
    final_note = note_to_change + note_add_end;
    return final_note;
  }
 }

function transposeDown(){
  //collect all html elements with noteline tag
  let elms = document.querySelectorAll("[id='noteline']");

 if (elms.length == 0) {return;}
  
  //loops through html elements
  for(var i = 0; i < elms.length; i++){
      elms[i].style.color='red'; //changes to red since note is being changed
      
      let b = [] //creates a set of the current array of notes
      for (let x = 0 ; x < notes_total[i].length; x++) {
        
        if (!b.includes(notes_total[i][x])) {
          b.push(notes_total[i][x])
        }


      }

      
      //loop through our set to convert each note
      for (let n = 0; n < b.length; n++) {
        let cur_note = b[n]
        let new_note = transposeDownConvert(cur_note)
        tmp = replaceAll(notes_total[i],cur_note,new_note);
        notes_total[i] = tmp
        
        //special case if our note is only one character long
        if (cur_note.length == 1 ) {

          
          let pattern = new RegExp(`(?<![\\/])\\b${cur_note}\\b(?![/#])`, 'g');

          
          elms[i].innerHTML = elms[i].innerHTML.replaceAll(pattern, new_note)


        }

        else if (cur_note.length == 1 ) {
          
          //let escapedCharacter = cur_note.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          let pattern = new RegExp(`(?<!\\/|\\S)${cur_note}(?!\\/|\\S)`, 'g');
          //let outputString = input.replace(pattern, 'XX');
          
          
          
          elms[i].innerHTML = elms[i].innerHTML.replaceAll(pattern, new_note)


        }
        //regular case
        else {
          let pattern = new RegExp(`(?<!\\/|\\S)${cur_note}(?!\\/|\\S)`, 'g');

          elms[i].innerHTML = elms[i].innerHTML.replaceAll(pattern, new_note)
        }

      }

    }
  
    counter--;
    
    //if our counter is at the begginging of our array, then we change notes back to green.
  if ((counter+12) % 12 == 0 && counter!=0) {
    
    counter = 0;
  }
  
  if ((counter+12) % 12 == 0) {
    for(var i = 0; i < elms.length; i++){
    
      elms[i].style.color='green';
    }
  }
  
 
  

  
  
  
}
//function that returns the next note one semitone down
function transposeDownConvert(note) {
  if (note.includes('/')) { //double note
    let note1 = ''
    let note2 = ''
    let note1_select = true;
    for (let i = 0; i < note.length; i++) {
      
      if (note.charAt(i) == '/') {
        note1_select = false;
        continue
      }
      if (note1_select) {
        note1+= note.charAt(i)
      }

      else {
        note2+= note.charAt(i)
      }

    }
    note_re = transposeDownConvert(note1) + "/" + transposeDownConvert(note2);
    return note_re
   }


  else if (note.includes('b')) { //minor
    let note_to_change = '';
    let note_add_end = '';
    let final_note = '';

    for (let i = 0; i < note.length; i++) {
      let character = note.charAt(i)
      if (i == 0) {
        note_to_change += character;
      }
      else if (i == 1 && character == 'b') {
        note_to_change += character;
      }
      else {
        note_add_end += character;
      }
    }
  
  
    
    let index = notes_minor.indexOf(note_to_change);
    index--; 
    
    
    note_to_change = notes_minor[(index + 12) % 12];
    final_note = note_to_change + note_add_end;
    return final_note;
   }
  
  else { //regular note or sharp
    //seperate our note

    let note_to_change = '';
    let note_add_end = '';
    let final_note = '';
    
    if (note.length == 1) {
      note_to_change = note;
      let index = notes_sharp.indexOf(note_to_change);
      index--; 
    
     
      note_to_change = notes_sharp[(index + 12) % 12];
      final_note = note_to_change + note_add_end;
      return final_note;
    }
    
  
    for (let i = 0; i < note.length; i++) {
      let character = note.charAt(i)
      if (i == 0) {
        note_to_change += character;
      }
      else if (i == 1 && character == '#') {
        note_to_change += character;
      }
      else {
        note_add_end += character;
      }
    }
  
  
    
    let index = notes_sharp.indexOf(note_to_change);
    index--; 
    
    
    note_to_change = notes_sharp[(index + 12) % 12];
    final_note = note_to_change + note_add_end;
    return final_note;
  }
 }


document.getElementById('up').addEventListener("click", transposeUp);
document.getElementById('down').addEventListener("click", transposeDown);




 