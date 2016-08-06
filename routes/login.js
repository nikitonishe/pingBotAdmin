var Db = require('../Db/Db');

var get = function(req,res,next){
	if(req.session.adminId) return res.redirect('/');
	return res.render('pages/login');
}

var post = function(req, res, next){
	var db = new Db();
	var login = req.body.login;
	var password = req.body.password;
	db.authAdmin(login, password)
		.then(loggedIn => {
			if(!loggedIn) return Promise.reject();
			return db.getAdminId(login, next);
		})
		.then(id => {
			db.connection.close();
			if(!id) return Promise.reject();
			req.session.adminId = id;
			res.redirect('/');
		})
		.catch(err => {
			db.connection.close();
			res.render('pages/login');;
			if(err) next(err);
		});
}



module.exports.get = get;
module.exports.post = post;