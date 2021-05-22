const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const port = process.env.PORT || 4000;
const recipes = require('./src/routes/recipes');
const feedback = require('./src/routes/feedback');
const suggestions = require('./src/routes/suggestions');
const user = require('./src/routes/user')
const { ResponseObject } = require('./src/models/responseObject');

const logger = require('./src/utils/logger').getLogger('INDEX');
const loggerPath = 'index';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/recipes', recipes);
app.use('/feedback', feedback);
app.use('/suggestions', suggestions);
app.use('/user', user);

app.all('*', function (req, res) {
    res.status(404).send('Resource not found');
})

app.use(function (error, req, res, next) {
    logger.error(loggerPath + `.errorHandler error found ${ JSON.stringify(error) }`);
    logger.error(loggerPath + `.errorHandler request body ${ JSON.stringify(req.body) }`);
    logger.error(loggerPath + `.errorHandler request url ${ req.url }`);
    const response = new ResponseObject(false, error);
    res.status(500).send(response);
});

app.listen(port, function () {
    logger.info(loggerPath + `.listen server started on port ${ port }`);
})