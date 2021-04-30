let http = require('http'),
    path = require('path'),
    express = require('express'),
    errorhandler = require('errorhandler');


let app = express();

require('./models/Attendee');
require('./models/Speaker');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(express.text());

app.use(require('./routes/attendees'));
app.use(require('./routes/speakers'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


var server = app.listen( 3000, function(){
  console.log('Listening on port ' + server.address().port);
});