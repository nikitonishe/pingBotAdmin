var fs = require('fs');

var readFile = function(path, options){
	return new Promise(function(resolve, reject){
		fs.readFile(path, options, function(err, data){
			if(err) reject(err);
			resolve(data);
		})
	})
}

var writeFile = function(path, data, options){
	return new Promise(function(resolve, reject){
		fs.writeFile(path, data, options, function(err){
			if(err) return reject(err);
			resolve();
		})
	})
}

module.exports.readFile = readFile;
module.exports.writeFile = writeFile;