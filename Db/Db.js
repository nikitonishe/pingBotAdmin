var mongoose = require('mongoose'),
	AdminModel = require('./models/Admin'),
	config = require('../config');

mongoose.Promise = global.Promise;

var Db = function(){

	this.connection = mongoose.createConnection(config.get('mongodb:uri'));
	this.Admin = AdminModel(this.connection);

	this.authAdmin = (login, password, callback) => {
		return this.Admin.findOne({login: login, password: password})
			.then(admin => !!admin)
			.catch(err => errorHandler(err, callback));
	}

	this.getAdminById = (id) => this.Admin.findOne({_id: id});

	this.getAdminId = (login, callback) => {
		return this.Admin.findOne({login: login})
			.then(admin => {
				if(!admin) return false;
				return admin._id;
			})
			.catch(err => errorHandler(err, callback));
	}

	this.errorHandler = (err, callback) => {
		this.connection.close();
		callback(err)
	}

}

module.exports = Db;