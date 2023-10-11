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
        "word": "roses",
        "x": 44,
        "y": 34
    },
    {
        "word": "are",
        "x": 140,
        "y": 61
    },
    {
        "word": "red",
        "x": 209,
        "y": 86
    },
    {
        "word": "violets",
        "x": 122,
        "y": 120
    },
    {
        "word": "are",
        "x": 203,
        "y": 119
    },
    {
        "word": "blue",
        "x": 250,
        "y": 121
    },
    {
        "word": "i",
        "x": 175,
        "y": 189
    },
    {
        "word": "need",
        "x": 200,
        "y": 185
    },
    {
        "word": "to",
        "x": 274,
        "y": 183
    },
    {
        "word": "sleep",
        "x": 307,
        "y": 185
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

