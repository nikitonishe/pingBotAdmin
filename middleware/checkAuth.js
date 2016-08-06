var Db = require('../Db/Db');

var checkAuth = function(req, res, next){
	var id = req.session.adminId;
	if(!id) return res.redirect('/login');
	var db = new Db();
	db.getAdminById(id)
		.then(admin => {
			if(!admin) Promise.reject();
			res.locals.admin = admin;
			return next();
		})
		.catch(err => {
			db.connection.close
			if(err) return next(err);
			res.redirect('/login');
		})
}
module.exports = checkAuth;