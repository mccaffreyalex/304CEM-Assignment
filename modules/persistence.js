'use strict'
const schema = require('../schema/schema')

/**
* POSTing user to users collection
* @function
* @param {string} username - username to be added
* @param {string} password - password to be added
* @returns - user added to users collection
* @throws Will throw error if user not saved, username/password missing
*/

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

/**
* GET user from users collection
* @function
* @param {string} username - username to be GET
* @returns username/password from collection
* @throws Will throw error if username missing
* @throws Will throw error if incorrect password/user does not exist
*/

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

/**
* PUT user updates password
* @param {string} username - username to be updated
* @param {string} password - password to be updated
* @returns confirmation user is updated
* @throws Will throw error if username/password is missing from PUT request
* @throws Will throw error if user does not exist in collection
* @throws Will throw error if user is not updated
*/

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

/**
* DELETE user from users collection
* @param {string} username - username to be deleted
* @returns confirmation message 'Successfully deleted'
* @throws Will throw error if username/password is missing from DELETE request
* @throws Will throw error if error deleting user
*/

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

/**
* POST photo to photos collection
* @param {string} username - username for photo to be added against
* @param {string} photoID - ID of photo to be added to collection
* @param {string} location - location of photo
* @returns new photoModel schema including username, photoID, location
* @throws Will throw error if username/password is missing from POST request
* @throws Will throw error if error adding photo
*/

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

/**
* GET list of photos based off username entered
* @params {string} username - username for which favourite photos are going to be searched
* @returns list of photos in photos collection with username attached
* @throws Will throw error if username missing from GET request
* @throws Will throw error if error showing photos
*/

exports.getFavPhotos = username => new Promise((resolve, reject) => {
	if (username === undefined) reject(new Error('Username missing'))
	schema.photoModel.find({
		username: username
	}, function(err, favourites) {
		err ? reject(new Error('Error showing photos' + err)) : resolve(favourites)
	})
})

/**
* DELETE photo from photos collection based off username, photoID
* @params {string} username - username for photo to be deleted against
* @params {string} photoID - ID of photo to be deleted
* @returns photoID record deleted from photos collection
* @retuns message 'Successfully deleted'
* @throws Will throw error if username/photoID missing from DELETE request
* @throws Will throw error if error deleting photos
* @throws Will throw error if error deleting photos
*/

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
