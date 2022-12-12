const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Recipe = require('./models/homemade');

const DATABASE_URL = 'mongodb+srv://lookatjla:jAshDaGod3ss!@sei.pwit4m3.mongodb.net/homemade?retryWrites=true&w=majority'

const db = mongoose.connection

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); // tells our mongoose to connect to our database

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// create route
app.post('/recipes', (req, res) => {
    Recipe.create(req.body, (error, createdRecipe) => {
        if (error) {
            res.send('error')
            return
        }
        res.send(createdRecipe);
    });
});




// index route
app.get('/recipes', (req, res) => {
    Recipe.find({}, (error, foundRecipe) => {
        res.send(foundRecipe)
    })
});


// show route
app.get('/recipes/:id', (req, res) => {
    Recipe.findById(req.params.id, (error, foundRecipe) => {
        res.send(foundRecipe)
    })
});


// update route
app.put('/recipes/:id', (req, res) => {
    Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }, // makes sure the updated tweet is the actual new tweet, otherwise tweet will not update
        (error, updatedRecipe) => {
            console.log('recipe has been updated')
            res.send(updatedRecipe)
        }
    )
})


// delete route
app.delete('/recipes/:id', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id, (error, deletedRecipe) => {
        console.log('recipe has been deleted')
        res.send({ success: true })
    })
});





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