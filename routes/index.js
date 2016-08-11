var checkAuth = require('../middleware').checkAuth;

module.exports = function(app){
	app.get('/', checkAuth, require('./mainPage'));

	app.route('/buttons')
		.get(checkAuth, require('./buttons').get)
		.post(checkAuth, require('./buttons').post);

	app.get('/messages', checkAuth, require('./messages'));

	app.get('/sending', checkAuth, require('./sending'));

	app.get('/logout', require('./logout'));

	app.route('/login')
		.get(require('./login').get)
		.post(require('./login').post);
}