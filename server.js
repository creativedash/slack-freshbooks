
/**
 * Module dependencies
 */
var express         = require('express');
var bodyParser      = require('body-parser');
var Slack           = require('slack-client');
var config          = require('./config');


/**
 * Express settings
 */
var port            = process.env.PORT || 3000;
var app             = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/**
 * Slack settings
 */
var slack = new Slack(config.Slack.token, true, true);

slack.on('message', function(message){
    console.log(message);
});


/**
 * Routes
 */
app.get('/', function(req, res, next){ 
    return res.send('Express running'); 
});

app.post('/', function(req, res, next){
    console.log(req.body);
    return res.send('Goucher smells');
});


/**
 * Start server
 */
app.listen(port);
console.log('Express running on port ' + port);
