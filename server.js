
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
    var args    = (req.body.text || '').split(' ');



    // Confirm that our account sent the slash command
    if (token !== config.Slack.token) {
        return res.status(400).send('Invalid slack account');
    }

    // Show list of commands if no command present
    if (!command) {
        var message = [
            "Ready to start time tracking? Here's a list of commands:",
            '/time list',
            '/time status',
            '/time start',
            '/time stop'
        ];
        return res.status(200).send(message.join('\n'));
    }

    // Match on slash command
    switch(command){
        case 'list': return res.send('Show list of projects'); break;
        case 'status': return res.send('Show user status'); break;
        case 'start': return res.send('Start project'); break;
        case 'stop': return res.send('Stop project'); break; 
        default: return res.send('Invalid command');
    }
});


/**
 * Start server
 */
app.listen(port);
console.log('Express running on port ' + port);
