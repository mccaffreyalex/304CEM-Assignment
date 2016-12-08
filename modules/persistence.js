'use strict'
const schema = require('../schema/schema')
const index = require('../index')
const status = {
	internalServerError: 500
}

exports.addUser = function(req, res, next) {
	const user = new schema.userModel()

	user.username = req.params.username
	user.password = req.params.password
	user.save(function(err) {
		if (err) index.failure(res, next, 'User not saved', status.internalServerError)
		index.success(res, next, user)
	})
}

exports.showUsers = function(users, callback) {
	schema.userModel.find({}, function(err, users) {
		if (err) callback(new Error(err))
		return callback(null, users)
	})
}

exports.deleteUser = function(username, callback) {
	console.log('removing photo')
	schema.userModel.remove({
		username: username
	}, function(err, user) {
		if (err) callback(new Error(err))
		return callback(null, user)
	})
}

exports.addToFavourites = function(req, res, next) {
	const photo = new schema.photoModel()

	photo.photoID = req.params.photoID
	photo.location = req.params.location
	photo.save(function(err) {
		if (err) index.failure(res, next, 'Photo not saved', status.internalServerError)
		index.success(res, next, photo)
	})
}

exports.showFavourites = function(favourites, callback) {
	schema.photoModel.find({}, function(err, favourites) {
		if (err) callback(new Error(err))
		return callback(null, favourites)
	})
}

exports.deleteFavourite = function(photoID, callback) {
	console.log('removing photo')
	schema.photoModel.remove({
		photoID: photoID
	}, function(err, photo) {
		if (err) callback(new Error(err))
		return callback(null, photo)
	})
}

exports.update = function(photoID, location, callback) {
	console.log('Changing location of photo:' + photoID)
	schema.photoModel.findOneAndUpdate({
		photoID: photoID
	}, {
		'location': location
	}, function(err, photos) {
		if (err) callback(new Error(err))
		return callback(null, photos)
	})
}

