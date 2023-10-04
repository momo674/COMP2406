let input = "     A         E/G#             G#        "
let note = "G#"
//let pattern = new RegExp(`${note}(?!#)`, 'g');
//let escapedCharacter = note.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
let pattern = new RegExp(`(?<!\\/|\\S)${note}(?!\\/|\\S)`, 'g');
let outputString = input.replaceAll(pattern, 'XX');
console.log(outputString);
