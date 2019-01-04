var Express = require('express');
var app = new Express();

const fixture = require('./fixture')();

if (process.env.databaseURL === undefined) {
  var server = fixture.listen(0, function () {
    var port = server.address().port;
    //process.env.databaseURL = `http://127.0.0.1:${port}`;
    //process.env.databaseURL = 'https://databaseservice.cfapps.io';
    process.env.databaseURL = `http://localhost:5000`;
  });
}

function checkAuth(req, res, next) {
    //console.log('checkAuth ' + req.url);

    // don't serve /secure to those not logged in
    // you should add to this list, for each and every secure url
    //console.log(req.session);
    //console.log(req.session.authenticated);
    if ((req.url === '/profile' || req.url === '/feedback') && (!req.session || !req.session.authenticated)) {
        res.redirect('/login');
        return;
    }

    next();

}

var cookieParser = require('cookie-parser');

var session = require('express-session');

var MemoryStore = require('session-memory-store')(session);

app.use(cookieParser());

app.use(session({name: 'JSESSION', resave: true, saveUninitialized: false, secret: "nsSolutions", store: new MemoryStore()}));

var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(checkAuth);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');




app.use(Express.static(__dirname + '/public'));

//routes
var baseRoutes = require('./src/controllers/index');
app.use('/', baseRoutes);



module.exports = app;

app.listen(process.env.PORT || 7000);