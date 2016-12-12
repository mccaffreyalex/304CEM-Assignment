'use strict'
const model = require('./model')
const status = {
	ok: 200
    , added: 201
    , badRequest: 400
}
/**
 * Sends request to searchByTag function in model.js
 * @function
 * @param {string} req - HTTP request
 * @param {string} res - HTTP response
 * @throws HTTP code 400, err
 * @returns {[[Type]]} [[Description]]
 */

exports.search = (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET')
	model.searchByTag(req, (err, data) => {
		err ? res.send(status.badRequest, err) : res.send(status.ok, data)
		res.end()
	})
}
/**
 * Adds user to users collection
 * @function
 * @param {string} req - HTTP request
 * @param {string} res - HTTP response
 * @throws HTTP code 400, err
 * @returns {[[Type]]} [[Description]]
 */
exports.addUser = (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'POST')
	model.addUser(req.body.username, req.body.password, (err, user) => {
		err ? res.send(status.badRequest, err) : res.send(status.added, user)
		res.end()
	})
}
/**
 * Shows a list of users stored in the 'users' collection
 * @function
 * @param {string} req - HTTP request
 * @param {string} res - HTTP response
 * @throws HTTP code 400, err
 * @returns {[[Type]]} [[Description]]
 */
exports.getUser = (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET')
	model.getUser(req.authorization.basic.username, req.authorization.basic.password, (err, user) => {
		err ? res.send(status.badRequest, err) : res.send(status.ok, user)
		res.end()
	})
}

/**
 * Adds new user to 'users' collection
 * @function
 * @param {string} req - HTTP request
 * @param {string} res - HTTP response
 * @throws HTTP code 400, err
 * @returns updated user
 */
exports.updateUser = (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'PUT')
	model.updateUser(req.authorization.basic.username, req.body.password, (err, user) => {
		err ? res.send(status.badRequest, err) : res.send(user)
		res.end()
	})
}

/**
* Deletes user from users collection
* @param {string} req - HTTP request
* @param {string} res - HTTP response
* @throws HTTP code 400, err
* @returns deleted user
*/
exports.deleteUser = (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'DELETE')
	model.deleteUser(req.authorization.basic.username, (err, message) => {
		err ? res.send(status.badRequest, err) : res.send(status.ok, message)
		res.end()
	})
}

/**
 * Shows all records in the photos collection
 * @function
 * @param {string} req - HTTP request
 * @param {string} res - HTTP response
 * @throws HTTP code 400, err
 * @returns {[[Type]]} [[Description]]
 */
exports.getFavPhotos = (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET')
	model.getFavPhotos(req.authorization.basic.username, (err, photos) => {
		err ? res.send(status.badRequest, err) : res.send(status.ok, photos)
		res.end()
	})
}

/**
 * Adds a photo to photos collection
 * @function
 * @param {string} req - HTTP request
 * @param {string} res - HTTP response
 * @throws HTTP code 400, err
 * @returns {[[Type]]} [[Description]]
 */
exports.addFavPhoto = (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'POST')
	model.addFavPhoto(req.authorization.basic.username, req.body.photoID, req.body.location, (err, data) => {
		err ? res.send(status.badRequest, err) : res.send(status.added, data)
		res.end()
	})
}

/**
 * Deletes a photo from the 'photos' collection
 * @function
 * @param {string} req - HTTP request
 * @param {string} res - HTTP response
 * @param {number} photoID - id of photo
 * @throws HTTP code 400, err
 * @returns {[[Type]]} [[Description]]
 */
exports.deleteFavPhotos = (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'DELETE')
	model.deleteFavPhotos(req.authorization.basic.username, req.body.photoID, (err, data) => {
		err ? res.send(err) : res.send(data)
		res.end()
	})
}
