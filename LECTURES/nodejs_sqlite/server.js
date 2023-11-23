/*
(c) 2022 Louis D. Nel

Basic express server with middleware,
SQLite database.

The server allows client to find
chord progressions of songs in
its SQLite database. The database provided h
as chord progressions of some 1200 popular jazz standards.

********************************************************************
Here we do server side rendering WITHOUT a
template engine.
In This example partial HTML files are
"rendered" with data placed in between them:

header.html + data + footer.html
*********************************************************************
*/

const http = require('http')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const fs = require('fs')
//read routes modules
const routes = require('./routes/index')

const  app = express() //create express middleware dispatcher

const PORT = process.env.PORT || 3000

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs'); //use hbs handlebars wrapper

app.locals.pretty = true //to generate pretty view-source code in browser

//some logger middleware functions
function methodLogger(request, response, next){
		   console.log("METHOD LOGGER")
		   console.log("================================")
		   console.log("METHOD: " + request.method)
		   console.log("URL:" + request.url)
		   next(); //call next middleware registered
}
function headerLogger(request, response, next){
		   console.log("HEADER LOGGER:")
		   console.log("Headers:")
           for(k in request.headers) console.log(k)
		   next() //call next middleware registered
}

//register middleware with dispatcher
//ORDER MATTERS HERE
//middleware
app.use(routes.authenticate); //authenticate user
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
//app.use(methodLogger)
//routes
app.get('/index.html', routes.index)
app.get('/songs', routes.find)
app.get('/users', routes.users)
app.get('/song/*', routes.songDetails)

//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
		console.log(`Server listening on port: ${PORT} CNTL:-C to stop`)
		console.log(`To Test:`)
		console.log('user: ldnel password: secret')
		console.log('http://localhost:3000/index.html')
		console.log('http://localhost:3000/users')
		console.log('http://localhost:3000/songs?title=Love')
		console.log('http://localhost:3000/song/372')
	}
})
