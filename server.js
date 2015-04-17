
/**
 * Module dependencies
 */
var express         = require('express');
var bodyParser      = require('body-parser');
var config          = require('./config');


/**
 * Express settings
 */
var port            = process.env.PORT || 3000;
var app             = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/**
 * Routes
 */
app.get('/', function(req, res, next){
    return res.send('Slack integration for Freshbooks');
});


app.post('/', function(req, res, next){
    var token   = req.body.token || '';
    var command = (req.body.text || '').split(' ')[0];
    var args    = (req.body.text || '').split(' ').splice(1);

    if (!command) return res.status(400).send('Invalid command');
    if (token !== config.Slack.token) return res.status(400).send('Invalid slack account');
    

    return res.send('Goucher smells');
});


/**
 * Start server
 */
app.listen(port);
console.log('Express running on port ' + port);
