const express = require('express');
const app = express();
const mongoose = require('mongoose');

const DATABASE_URL = 'mongodb+srv://lookatjla:jAshDaGod3ss!@sei.pwit4m3.mongodb.net/homemade?retryWrites=true&w=majority'

const db = mongoose.connection

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); // tells our mongoose to connect to our database

// database connection error/success
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// routes and routers
app.get('/', (req, res) => {
    res.send('<h1>server is working</h1>')
});


// start the server (listener)
const PORT = process.env.PORT || 3007
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});