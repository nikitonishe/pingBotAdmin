var logout = function(req, res, next){
	req.session.destroy();
	res.redirect('/login');
}

module.exports = logout;