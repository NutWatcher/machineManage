/**
 * Module dependencies.
 */


var index = require('./controllers/index');
var view = require('./controllers/view');

module.exports = function (app) {
    // home page
    app.get('/', view.index);
    app.get('/index', view.index);
    app.get('/addMachine', view.addMachine);

};