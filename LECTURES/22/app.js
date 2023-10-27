let p1 = {colour: 'red'}
let x = {animal: 'dog', name: 'bob'}
x.__proto__ = p1;

//when an object protypes another object (lets say x.__proto__ = p1)
//x never inheriates anything from p1. It is the exact same
console.log(x); // -> { animal: 'dog', name: 'bob' } **whewre is colour??

for (k in x) {
    console.log(k);
}
console.log('\n')


//basically, a protype is a shadow. when x proto = p1, x can point to p1 for whatever taks required.


//when we set x's property that belongs to a protoype a new value, it just makes a new property for x.
x.colour = 'purple'; 
console.log(x.colour); // -> { animal: 'dog', name: 'bob', colour: 'purple' }
console.log('\n')


let y = {size: 13, age: 14}
y.__proto__ = p1;
y.__proto__.colour = "orange" // this changes the colour in p1 to orange. y.color = orange, but x stays the same.

//the reason why x stays the same is because x doesnt point to its prototype for that proeprty anymore. It has it's own copy.


console.log(x.colour); // -> purple
console.log(y.colour); // -> orange





 x.sayHello = () => (x.animal + " " + x.name);

 console.log(x.sayHello())
 x.sayHello