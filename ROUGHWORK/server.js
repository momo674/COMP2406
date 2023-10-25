const http = require('http');
const fs = require('fs')
const url = require('url')

const server = http.createServer( (request, response) =>{

    console.log(request.url);
    
    //async
    fs.readFile('html' + request.url, (err,data) => {
        if(err){
            console.log("404");
            fs.readFile('html/error.html', (errorErr, errorData) => {
                if (errorErr) {
                    console.log("404 FILE IS NOT FOUND")
                    response.writeHead(404, {'Content-Type': 'text/plain'})
                    response.end("not found.");
                }
                else {
                    console.log("404 FILE FOUND");
                    response.writeHead(404, {'Content-Type': 'text/html'})
                    response.end(errorData);
                }
            })
        }

        else {
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.end(data)
        }
    
    })
} )

server.listen(3000);
