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
      note = "[" + note + "]"
      notes.push(note)
     
      
      if (line.charAt(save) == " ") {
        save+=1
      }
      notes_index.push(save + 1)
      
      
      
      line = line.replace(note, "")
      x = line.indexOf("[")
      note = ""
      
      
      
      
      
      
    }
    console.log(notes)
    console.log(org_line)
    
    textDiv.innerHTML +=  `<p> ${org_line}</p>`
    // textDiv.innerHTML = textDiv.innerHTML.replaceAll("]", `<span class="chord">]</span class="chord">`)
    // textDiv.innerHTML = textDiv.innerHTML.replaceAll("[", `<span class="chord">[</span class="chord">`)
    for (let j = 0; j < notes.length; j++) {
      textDiv.innerHTML = textDiv.innerHTML.replaceAll(notes[j], `<span class="chord">${notes[j]}</span class="chord">`)
    }
    // for (let j = 0; j < notes.length; j++) {
    //   textDiv.innerHTML = textDiv.innerHTML.replaceAll(notes[j], `<span class="chord">
    //   ${notes[j]}</span class="chord">
    //   `)

    // }
  }
}
 