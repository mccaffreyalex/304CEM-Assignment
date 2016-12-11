'use strict'
const schema = require('../schema/schema')

exports.addUser = (username, password) => new Promise((resolve, reject) => {
	if (username === undefined || password === undefined) reject(new Error('Username/password missing'))
	const userSchema = new schema.userModel({
		username: username
        , password: password
	})

	userSchema.save(function(err, user) {
		err ? reject(new Error('User not saved' + err)) : resolve(user)
	})
})

exports.getUser = username => new Promise((resolve, reject) => {
	if (username === undefined) reject(new Error('Username missing'))
	schema.userModel.find({
		username: username
	}, function(err, user) {
		err ? reject(new Error({
			message: 'Incorrect password/user does not exist'
		})) : resolve(user)
	})
})

exports.updateUser = (username, password) => new Promise((resolve, reject) => {
	if (username === undefined || password === undefined) reject(new Error('Username/password missing'))
	schema.userModel.findOneAndUpdate({
		username: username
	}, {
		password: password
	}, {
		new: true
	}, function(err, user) {
		!user ? reject(new Error('User does not exist')) : resolve(user)
		err ? reject(new Error('Error updating user' + err)) : resolve(user)
	})
})

exports.deleteUser = username => new Promise((resolve, reject) => {
	if (username === undefined) reject(new Error('Username missing'))
	schema.userModel.remove({
		username: username
	}, function(err) {
		err ? reject(new Error('Error deleting user' + err)) : resolve({
			message: 'Successfully deleted'
		})
	})
})

exports.addFavPhoto = (username, photoID, location) => new Promise((resolve, reject) => {
	if (username === undefined || photoID === undefined || location === undefined) reject(new Error('Username/photoID/location missing'))
	const photoSchema = new schema.photoModel({
		username: username
        , photoID: photoID
        , location: location
	})

	photoSchema.save(function(err, photo) {
		err ? reject(new Error('Error adding photo' + err)) : resolve(photo)
	})
})

exports.getFavPhotos = username => new Promise((resolve, reject) => {
	if (username === undefined) reject(new Error('Username missing'))
	schema.photoModel.find({
		username: username
	}, function(err, favourites) {
		err ? reject(new Error('Error showing photos' + err)) : resolve(favourites)
	})
})

exports.deleteFavPhotos = (username, photoID) => new Promise((resolve, reject) => {
	if (username === undefined || photoID === undefined) reject(new Error('Username/photoID missing'))
	schema.photoModel.findOneAndRemove({
		username: username
        , photoID: photoID
	}, function(err, photo) {
		console.log(photo)
		err ? reject(new Error('Error deleting photos' + err)) : resolve({
			message: 'Successfully deleted'
		})
	})
})
