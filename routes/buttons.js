var fs = require('../libs/fsPromise'),
	config = require('../config');

var get = function(req, res, next){
	fs.readFile(config.get('textsPath'), 'utf-8')
		.then(data => {
			res.locals.texts = JSON.parse(data);
			return res.render('pages/buttons');
		})
		.catch(err => next(err));
}

var post = function(req, res, next){
	fs.readFile(config.get('textsPath'), 'utf-8')
		.then(data => {
			texts = JSON.parse(data);
			texts.favoritesButton = req.body.favoritesButton;
			texts.addSiteButton = req.body.addSiteButton;
			texts.cancelButton = req.body.cancelButton;
			texts.openButton = req.body.openButton;
			texts.restoreButton = req.body.restoreButton;
			texts.removeButton = req.body.removeButton;
			return fs.writeFile(config.get('textsPath'), JSON.stringify(texts, '', 4), 'utf-8');
		})
		.then(() => res.redirect('/buttons'))
		.catch(err => next(err))

}

module.exports.get = get;
module.exports.post = post;