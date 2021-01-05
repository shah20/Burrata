const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const port = process.env.PORT || 4000;
const recipes = require('./src/routes/recipes');
const feedback = require('./src/routes/feedback');
const suggestions = require('./src/routes/suggestions');

const logger = require('./src/utils/logger').getLogger('INDEX');
const loggerPath = 'index';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/recipes', recipes);
app.use('/feedback', feedback);
app.use('/suggestions', suggestions);

app.get('*', function (req, res) {
    res.send('Invalid request');
})

app.use(function (error, req, res, next) {
    logger.error(loggerPath + `.errorHandler error found ${ JSON.stringify(error) }`);
    logger.error(loggerPath + `.errorHandler request body ${ JSON.stringify(req.body) }`);
    logger.error(loggerPath + `.errorHandler request url ${ req.url }`);
    res.status(500).send(error);
});

app.listen(port, function () {
    logger.info(loggerPath + `.listen server started on port ${ port }`);
})