var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var adminSchema = new Schema({
	login: String,
	password: String,
	sid: String
})

var AdminModel = function(connection){
	return connection.model('admin', adminSchema);
}

module.exports = AdminModel;