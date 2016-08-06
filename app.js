var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	MongoDbStore = require('connect-mongodb-session')(session);

var config = require('./config');

var app = express(),
 	store = new MongoDbStore({
		uri: config.dbUri,
		collection: 'sessions'
	})

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: config.get('session:secret'),
	store: store,
	cookie: config.get('session:cookie')
}));

app.set('view engine', "ejs");

require('./routes')(app);

app.listen(config.get('port'));