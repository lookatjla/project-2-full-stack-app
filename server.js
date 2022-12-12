// 1. import dependencies
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const mongoose = require('mongoose')


// 2. define app and port
const app = express()
const PORT = process.env.PORT || 3007


// 3. database connection
const MONGO_URL = process.env.MONGO_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


// 4. establish connection
mongoose.connect(MONGO_URL, CONFIG)


// 5. mongoose connection events
mongoose.connection
    .on('open', () => console.log('mongoose connected'))
    .on('close', () => console.log('mongoose disconnected'))
    .on('error', (error) => console.log('mongoose error', error))


// 6. create recipe model
const { Schema, model } = mongoose

const recipeSchema = new Schema({
    title: String,
    prep_time: String,
    cook_time: String,
    serving_size: Number,
    ingredients: String,
    instructions: String,
})

const Recipe = model('Recipe', recipeSchema)


// 7. register middleware
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


// 8. create initial route
app.get('/', (req, res) => {
    res.send('<h1>server is working</h1>')
});

// 11. define data to be used in the database
app.get('/recipes/seed', (req, res) => {
    const starterRecipes = [
        { title: 'Creamy Homemade Baked Macaroni & Cheese', prep_time: '20 minutes', cook_time: '15 minutes', serving_size: 8, ingredients: '1 lb. dried elbow pasta, 1/2 cup butter, 1/2 cup all-purpose flour, 1 1/2 cups whole milk, 2 1/2 cups half and half, 4 cups shredded medium sharp cheddar cheese, 2 cups shredded Monterey Jack cheese, 1/2 Tbsp. salt, 1/2 tsp. black pepper, 1/4 tsp. paprika', instructions: 'Preheat oven to 325 degrees F and grease a 3 qt baking dish (9x13"). Set aside. Bring a large pot of salted water to a boil. When boiling, add dried pasta and cook 1 minute less than the package directs for al dente.  Drain and drizzle with a little bit of olive oil to keep from sticking. While water is coming up to a boil, shred cheeses and toss together to mix, then divide into three piles.  Approximately 3 cups for the sauce, 1 1/2 cups for the inner layer, and 1 1/2 cups for the topping. Melt butter in a large saucepan over MED heat. Sprinkle in flour and whisk to combine. Mixture will look like very wet sand.  Cook for approximately 1 minute, whisking often. Slowly pour in about 2 cups or so of the milk/half and half, while whisking constantly, until smooth. Slowly pour in the remaining milk/half and half, while whisking constantly, until combined and smooth. Continue to heat over MED heat, whisking very often, until thickened to a very thick consistency. It should almost be the consistency of a semi thinned out condensed soup. Remove from the heat and stir in spices and 1 1/2 cups of the cheeses, stirring to melt and combine. Stir in another 1 1/2 cups of cheese, and stir until completely melted and smooth. In a large mixing bowl, combine drained pasta with cheese sauce, stirring to combine fully. Pour half of the pasta mixture into the prepared baking dish. Top with 1 1/2 cups of shredded cheeses, then top that with the remaining pasta mixture. Sprinkle the top with the last 1 1/2 cups of cheese and bake for 15 minutes, until cheesy is bubbly and lightly golden brown.' },
        { title: 'Fluffy Pancakes', prep_time: '5 minutes', cook_time: '20 minutes', serving_size: 12, ingredients: '2 cups all purpose flour, 1/4 cup granulated sugar, 4 teaspoons baking powder, 1/4 teaspoon baking soda, 1/2 teaspoon salt, 1 3/4 cups milk, 1/4 cup butter, 2 teaspoons vanilla extract, 1 large egg', instructions: 'Combine together the flour, sugar (or sweetener), baking powder, baking soda and salt in a large-sized bowl. Make a well in the center and add the milk, slightly cooled melted butter, vanilla and egg. Use a wire whisk to whisk the wet ingredients together first before slowly folding them into the dry ingredients. Mix together until smooth. Set the batter aside and allow to rest while heating up your pan or griddle. Heat a nonstick pan or griddle over low-medium heat and wipe over with a little butter to lightly grease pan. Pour ¼ cup of batter onto the pan and spread out gently into a round shape with the back of your ladle or measuring cup. When the underside is golden and bubbles begin to appear on the surface, flip with a spatula and cook until golden. Repeat with remaining batter. Serve with honey, maple syrup, fruit, ice cream or frozen yogurt, or enjoy plain!' },
        { title: 'Best Chocolate Chip Recipe Ever', prep_time: '10 minutes', cook_time: '8 minutes', serving_size: 36, ingredients: '1 cup softened salted butter, 1 cup white granulated sugar, 1 cup packed light brown sugar, 2 tsp vanilla extract, 2 large eggs, 3 cups all-purpose flour, 1 tsp baking soda, 1/2 tsp baking powder, 1 tsp sea salt, 2 cups chocolate chips', instructions: 'Preheat oven to 375 degrees F. Line a baking pan with parchment paper and set aside. In a separate bowl mix flour, baking soda, salt, baking powder. Set aside. Cream together butter and sugars until combined. Beat in eggs and vanilla until fluffy. Mix in the dry ingredients until combined. Add 12 oz package of chocolate chips and mix well. Roll 2 TBS of dough at a time into balls and place them evenly spaced on your prepared cookie sheets. Bake in preheated oven for approximately 8-10 minutes. Take them out when they are just BARELY starting to turn brown. Let them sit on the baking pan for 2 minutes before removing to cooling rack.' }
    ]
    // 12. delete all recipes
    Recipe.deleteMany({}, (err, data) => {
        // 13. create new recipes once old recipes are created
        Recipe.create(starterRecipes, (err, createdRecipes) => {
            res.json(createdRecipes)
        })
    })
})


// 9. server listener
app.listen(PORT, () => console.log(`listening on port ${PORT}`))




// const Recipe = require('./models/homemade');

/*
const DATABASE_URL = 'mongodb+srv://lookatjla:jAshDaGod3ss!@sei.pwit4m3.mongodb.net/homemade?retryWrites=true&w=majority'
 
 
mongoose.connect(DATABASE_URL, {
 
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
*/