/*
(c) 2022 Louis D. Nel
Example of http static server
built using express.js, and its built in static middleware

express.static(root_file_path) is a middleware actually built
into express.
Here we use it to implement a static server


Testing: Use browser to view pages at:
http://localhost:3000/01hello.html
http://localhost:3000/02index.html
http://localhost:3000/03table.html
http://localhost:3000/04internalCSS.html
http://localhost:3000/05externalCSS.html
http://localhost:3000/06form.html
*/

//Cntl+C to stop server

const express = require('express')
const path = require('path')
const fs = require('fs')

const ROOT_DIR = 'html' //dir to serve static files from

const app = express() //create express server

const root_file_path = path.join(__dirname, ROOT_DIR)
//ORDER of the app.use() calls is important here
app.use(function(request, response, next) {
  const requested_file_path = path.join(__dirname, ROOT_DIR, request.url)
  console.log(`requested file: ${requested_file_path}`)
  next()
})

app.use(express.static(root_file_path)) //express's static middleware

//error case will run if no middleware above
//handles the request
app.use(function(request, response) {
  response.status(404)
  response.send(`File not found`)
})

app.listen(3000, function() {
  console.log(`Static Server listening on PORT 3000, CNTL-C to Quit`)
  console.log(`To Test`)
  console.log(`http://localhost:3000/01hello.html`)
  console.log(`http://localhost:3000/02index.html`)
  console.log(`http://localhost:3000/03table.html`)
  console.log(`http://localhost:3000/04internalCSS.html`)
  console.log(`http://localhost:3000/05externalCSS.html`)
  console.log(`http://localhost:3000/06form.html`)
})
