const express = require('express')
const app = express()

app.use(express.static("public"))

app.set('view enginer', 'ejs')

// app.get('/',  (req, res) => {
//     res.render('index.ejs', {text: 'world'})

// }) 


const userRouter = require ('./routes/users')

app.use('/users', userRouter)

app.listen(3000)
