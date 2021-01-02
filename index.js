const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const port = process.env.PORT || 4000;
const recipes = require('./routes/recipes').recipes;
const feedback = require('./routes/feedback').feedback;
const suggestions = require('./routes/suggestions').suggestions;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/recipes', recipes);
app.use('/feedback', feedback);
app.use('/suggestions', suggestions);

app.get('*', function (req, res) {
    res.send('Invalid request');
})

app.use(function (error, req, res, next) {
    console.log('Some Error occured');
    console.log('Error', error);
});

app.listen(port, function () {
    console.log("Server started on port ", port)
})