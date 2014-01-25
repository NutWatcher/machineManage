/**
 * Module dependencies.
 */


var index = require('./controllers/index');

module.exports = function (app) {
    // home page
    app.get('/', index.index);

};