function twerk(){
    return "twerk";
}

let x = 1;
let bool = false;

function print(a){

    setTimeout(function(){
        console.log("Did your message print? y/ " + x);
        bool = true;
        x++;
    }, x*1)
    console.log(a);
}


print(twerk());
console.log("a");
console.log("a");
console.log("a");
console.log("a");console.log("a");console.log("a");console.log("a");

if(bool) {
    console.log("here");
}

console.log("a");console.log("a");console.log("a");console.log("a");console.log("a");console.log("a");console.log("a");console.log("a");console.log("a");console.log("a");console.log("a");


console.log(x)

print(twerk());
