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
    console.log('Some Error occured')
});

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})