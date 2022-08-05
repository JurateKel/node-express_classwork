const express = require('express')
const app = express()
const cors = require('cors') // command line: npm i cors
const mongoose  = require('mongoose')
const session = require('express-session')
require('dotenv').config()




app.listen(4000)
app.use(cors({origin: "http://localhost:3000", credentials: true, methods: 'GET, HEAD, PUT, PATCH, POST, DLETE'}))
app.use(express.json())

app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false},
    })
)

    
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSW}@cluster0.xgv54mt.mongodb.net/?retryWrites=true&w=majority`).then(res => console.log('database connected')).catch(e => console.log(e))

const router = require('./router/mainRouter')
app.use('/', router)



