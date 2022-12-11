// import
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const mongoose = require('mongoose')


// create app
const app = express()


// register my middleware
app.use(morgan('dev'))
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// routes and routers
app.get('/', (req, res) => {
    res.send('<h1>server is working</h1>')
})


// start the server (listener)
const PORT = process.env.PORT || 3007
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

