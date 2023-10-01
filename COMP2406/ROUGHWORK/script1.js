let x = 7; //defining a normal variable

const y = 3; //variable cant be changed, think of final.

var z = 5; //not similar to normal vairbale defiing, has global scope in function.

/* Always use let for simplicity. */



function add(x, y) {
    return x + y;
}


console.log(add(x,y));

//java script objects

const bird = {breed: "Cockatiel", age: 3, name: "cosmo", speak: function() {
    for (let i = 0; i < this.age; i++) {
        console.log("TWEEK");
    }
    return "p";
    }
}

bird.speak();

if (bird.name == (bird["name"])) {
    
   
}


let a = new bird();
a.speak();