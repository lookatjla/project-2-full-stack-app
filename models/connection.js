// database connection
require('dotenv').config()
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


// establish mongo connection
mongoose.connect(process.env.MONGO_URL)


// mongoose connection events
mongoose.connection
    .on('open', () => console.log('connected to mongo'))
    .on('close', () => console.log('disconnected from mongo'))
    .on('error', (error) => console.log(error))


// export mongoose with connection to use in other files
module.exports = mongoose