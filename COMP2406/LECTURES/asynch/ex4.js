function read() {
    console.log("read data");
}

function process() {
    setTimeout(function(){console.log("process data")}, 1000)
}
    

function output() {
    console.log("output results");
}

read();
process();
output();