let notes_line_stored = [];
let notes_total = [];
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
   for (let i = 0; i < notes.length; i++) {
    if (notes_line.charAt(notes_index[i] - 1) != " ") {
      let prevnote = notes[i-1]
      notes_line = notes_line.slice(0,notes_index[i - 1] + prevnote.length) + notes[i] + notes_line.slice(notes_index[i - 1] + prevnote.length)
    }
    else {
      notes_line = notes_line.slice(0,notes_index[i] - 1) + notes[i] + notes_line.slice(notes_index[i] - 1)
    }
   
   } 
    notes_line_stored.push(notes_line);
    textDiv.innerHTML += `<pre id = "noteline">${notes_line}</pre>`
    textDiv.innerHTML +=  `<pre> ${line}</pre>`
    notes_total.push(notes);

    
  }

  
}


let notes_sharp = ['A',	'A#', 'B',  'C', 'C#',	'D',	'D#',	'E',	'F',	'F#',	'G',	'G#']
let notes_minor = ['A'	,'Bb','B',	,'C',	'Db',	'D',	'Eb',	'E',	'F',	'Gb',	'G'	,'Ab']
let counter = 0;
function transposeUp(){
  
    let elms = document.querySelectorAll("[id='noteline']");
   if (elms.length == 0) {return;}
    
    
    for(var i = 0; i < elms.length; i++){
        elms[i].style.color='red';
        let b = []
        
        for (let x = 0 ; x < notes_total[i].length; x++) {
          
          if (!b.includes(notes_total[i][x])) {
            b.push(notes_total[i][x])
          }


        }
        
        for (let n = 0; n < b.length; n++) {

          
          
          

          let cur_note = b[n]
          let new_note = transposeUpConvert(cur_note)
          
          

          tmp = replaceAll(notes_total[i],cur_note,new_note);
          notes_total[i] = tmp

          elms[i].innerHTML = elms[i].innerHTML.replaceAll(cur_note, new_note)
          //console.log(elms[i].innerHTML + " " + i + cur_note + " " + new_note)
          
        }
        
        
        
    
    }
    counter++;
    if (counter % 12 == 0 && counter!=0) {
      
      counter = 0;
    
    

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


function transposeUpConvert(note) {
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
    note_re = transposeUpConvert(note1) + "/" + transposeUpConvert(note2);
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
    index++; 
    
    
    note_to_change = notes_minor[index % 12];
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
      index++; 
    
    
      note_to_change = notes_sharp[index % 12];
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
    index++; 
    
    
    note_to_change = notes_sharp[index % 12];
    final_note = note_to_change + note_add_end;
    return final_note;
  }
 }

function transposeDown(){
  
  let elms = document.querySelectorAll("[id='noteline']");
 if (elms.length == 0) {return;}
  
  
  for(var i = 0; i < elms.length; i++){
      elms[i].style.color='red';
      let b = []
      
      for (let x = 0 ; x < notes_total[i].length; x++) {
        
        if (!b.includes(notes_total[i][x])) {
          b.push(notes_total[i][x])
        }


      }
      
      for (let n = 0; n < b.length; n++) {

        
        
        

        let cur_note = b[n]
        let new_note = transposeDownConvert(cur_note)
        
        

        tmp = replaceAll(notes_total[i],cur_note,new_note);
        notes_total[i] = tmp

        elms[i].innerHTML = elms[i].innerHTML.replaceAll(cur_note, new_note)
        //console.log(elms[i].innerHTML + " " + i + cur_note + " " + new_note)
        
      }
      
      
      
  
  }
  counter--;
  if (counter % 12 == 0 && counter!=0) {
    
    counter = 0;
  
  

  for(var i = 0; i < elms.length; i++){
    
    elms[i].style.color='green';
    
  }
  return
  
 
  
}
  
  
  

}

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
    note_re = transposeUpConvert(note1) + "/" + transposeUpConvert(note2);
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
    
    
    note_to_change = notes_minor[index % 12];
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
    
    
      note_to_change = notes_sharp[index % 12];
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
    
    
    note_to_change = notes_sharp[index % 12];
    final_note = note_to_change + note_add_end;
    return final_note;
  }
 }


document.getElementById('up').addEventListener("click", transposeUp);
document.getElementById('down').addEventListener("click", transposeDown);




 