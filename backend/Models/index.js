const mongoose = require('mongoose');
mongoose.set("debug", true)
mongoose.connect('mongodb://localhost/storeBackend-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
    });

mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Products = require('./products');
module.exports.Cart = require('./cart')