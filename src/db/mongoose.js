const mongoose = require('mongoose');
const constants = require('../utils/constants').constants;

mongoose.connect(constants.dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
})
