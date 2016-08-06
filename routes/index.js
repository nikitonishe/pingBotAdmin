var checkAuth = require('../middleware').checkAuth;

module.exports = function(app){
	app.get('/', checkAuth, require('./startpage'));

	app.get('/logout', require('./logout'));

	app.route('/login')
		.get(require('./login').get)
		.post(require('./login').post);
}