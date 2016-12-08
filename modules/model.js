'use strict'
//---------------------------------------------------------------------
const api = require('./data-api')
const model = require('./model')
const persistence = require('./persistence')
const status = {
	ok: 200
        , added: 201
        , badRequest: 400
}
//---------------------------------------------------------------------
    /**
     * Callback for searching Flickr & Apixu weather in a promise chain
     * @param {string} request - HTTP request
     * @callback searchByTag
     */

exports.searchByTag = (request, callback) => {
	api.extractParam(request, 't').then(tag => api.searchByTag(tag)).then(searchResults => {
		this.results = searchResults
		return api.searchByID(searchResults.photo_id)
	}).then(data => {
		this.data = data
		return api.searchWeather(request.params.t, data.dateTaken)
	}).then(weather => api.combinedData(this.results, this.data, weather)).then(data => {
		callback(null, data)
	}).catch(err => {
		callback(err)
	})
}

/**
     * Parses tag into searchByTag
     * @function
     * @param {string} req - HTTP request
     * @param {string} res - HTTP response
     * @returns {data} photo results, photo data, weather data combined
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
     * Shows a list of users stored in the 'users' collection
     * @function
     * @param {string} req - HTTP request
     * @param {string} res - HTTP response
     * @returns {[[Type]]} [[Description]]
     */
exports.showUsers = (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET')
	persistence.showUsers(req, (err, data) => {
		err ? res.send(err) : res.send(data)
		res.end()
	})
}


/**
     * Adds new user to 'users' collection
     * @function
     * @param {string} req - HTTP request
     * @param {string} res - HTTP response
     */
exports.addUser = persistence.addUser

exports.deleteUser = (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'DELETE')
	persistence.deleteUser(req.params.username, (err, data) => {
		err ? res.send(err) : res.send(data)
		res.end()
	})
}


/**
     * Shows all records in the photos collection
     * @function
     * @param {string} req - HTTP request
     * @param {string} res - HTTP response
     * @returns {[[Type]]} [[Description]]
     */
exports.showFavourites = (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'GET')
	persistence.showFavourites(req, (err, data) => {
		err ? res.send(err) : res.send(data)
		res.end()
	})
}

/**
     * Adds a photo to photos collection
     * @function
     * @param {number} photoID - id of photo
     * @returns {[[Type]]} [[Description]]
     */
exports.addToFavourites = persistence.addToFavourites

/**
     * Deletes a photo from the 'photos' collection
     * @function
     * @param {string} req - HTTP request
     * @param {string} res - HTTP response
     * @param {number} photoID - id of photo
     * @returns {[[Type]]} [[Description]]
     */
exports.deleteFavourite = (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'DELETE')
	persistence.deleteFavourite(req.params.photoID, (err, data) => {
		err ? res.send(err) : res.send(data)
		res.end()
	})
}


/**
     * Updates photo id location based off the photoID
     * @function
     * @param {string} req - HTTP request
     * @param {string} res - HTTP response
     * @param {photoID} req.params.photoID - photoID
     * @param {location} req.params.location - location
     * @returns {[[Type]]} [[Description]]
     */
exports.update = (req, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('accepts', 'PUT')
	persistence.update(req.params.photoID, req.params.location, (err, data) => {

		err ? res.send(status.badRequest, err) : res.send(data)
	})
}
