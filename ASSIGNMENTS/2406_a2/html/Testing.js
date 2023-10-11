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
        "x": 67,
        "y": 59
    },
    {
        "word": "are",
        "x": 60,
        "y": 139
    },
    {
        "word": "red",
        "x": 66,
        "y": 99
    },
    {
        "word": "violets",
        "x": 60,
        "y": 119
    },
    {
        "word": "are",
        "x": 67,
        "y": 80
    },
    {
        "word": "blue",
        "x": 61,
        "y": 159
    },
    {
        "word": "i",
        "x": 78,
        "y": 185
    },
    {
        "word": "need",
        "x": 56,
        "y": 208
    },
    {
        "word": "to",
        "x": 75,
        "y": 234
    },
    {
        "word": "poo",
        "x": 63,
        "y": 256
    }
]

words.sort(sortByCoordinatesY)
console.log(words);

let tmp = []
let result = []
let counter = 0;
for (let i = 0; i < words.length; i++ ) {
    if (counter > 0) {

        if (Math.abs(words[i]["y"] - words[i-1]["y"]) > 30) { //current word is at a much different line
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
result.push(...tmp);
words.sort(sortByCoordinatesX)


console.log(result)

