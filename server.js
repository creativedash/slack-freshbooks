
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


/**
 * Routes
 */
app.post('/', function(req, res, next){
    var token   = req.body.token || '';
    var command = (req.body.text || '').split(' ')[0];
    var args    = (req.body.text || '').split(' ').splice(1);

    if (!command) return res.status(200).send('Invalid command');

    Slack.message({
        icon: ":ui8:",
        message: 'Yo, testing. Ignore me for now.',
        channel: req.body.channel_id,
        username: "Freshbooks"
    });

    return res.send('Goucher smells');
});


/**
 * Start server
 */
app.listen(port);
console.log('Express running on port ' + port);
