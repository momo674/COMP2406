// Sample list of objects with X and Y coordinates
const objects = [
    { x: 3, y: 2 },
    { x: 1, y: 5 },
    { x: 4, y: 3 },
    { x: 2, y: 1 },
];

const yPadding = 20;

// Custom sorting function with padding
function sortByCoordinatesY(a, b) {
    if (a.y === b.y) {
        return a.x - b.x;
    }
    return a.y - b.y;
}

function sortByCoordinatesX(a, b) {
    if (a.x === b.x) {
        return a.y - b.y;
    }
    return a.x - b.x;
}




words = [
    {
        "word": "violets",
        "x": 117,
        "y": 209
    },
    {
        "word": "red",
        "x": 218,
        "y": 253
    },
    {
        "word": "blue",
        "x": 287,
        "y": 9
    },
    {
        "word": "need",
        "x": 344,
        "y": 182
    },
    {
        "word": "sleep",
        "x": 344,
        "y": 299
    },
    {
        "word": "to",
        "x": 445,
        "y": 30
    },
    {
        "word": "are",
        "x": 563,
        "y": 239
    },
    {
        "word": "roses",
        "x": 585,
        "y": 131
    },
    {
        "word": "are",
        "x": 597,
        "y": 60
    },
    {
        "word": "i",
        "x": 599,
        "y": 207
    }
]

words.sort(sortByCoordinatesY)
//console.log(words);

let tmp = []
let result = []
let counter = 0;
for (let i = 0; i < words.length; i++ ) {
   
    if (counter > 0) {

        if (Math.abs(words[i]["y"] - words[i-1]["y"]) > 15) { //current word is at a much different line
            if (counter!=1){result.push("")}; //adding new line
            result.push(...tmp);
            
            tmp = [];
            counter = 0;
        }

        else {
            tmp.push(words[i])
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
words.sort(sortByCoordinatesX)


console.log(result)