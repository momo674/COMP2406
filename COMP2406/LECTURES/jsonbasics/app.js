var obj = {
    name: 'Lou',
    date: new Date(),
    getName: function() {return this.name}
}


var jsonString = JSON.stringify(obj);

console.log(jsonString)

var obj2 = JSON.parse(jsonString);
console.log(obj2)

//json is a string version of javascript object, but it will not contain functions.