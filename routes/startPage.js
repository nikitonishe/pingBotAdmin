var index = function(req, res, next){
	console.log(res.locals.admin);
	return res.render('pages/startPage');
}

module.exports = index;