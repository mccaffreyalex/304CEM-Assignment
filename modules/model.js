'use strict'
//---------------------------------------------------------------------
const api = require('./data-api')
const persistence = require('./persistence')
const auth = require('./authorize')
//---------------------------------------------------------------------


/**
 * Callback for searching Flickr & Apixu weather in a promise chain
 * @param {string} request - HTTP request
 * @callback searchByTag
 * @returns
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
* Callback for adding a user to users collection, first the pwd is hashed
*@param {string} username - username to be added to collection
*@param {string} password - password to be added to collection
*@throws
*@callback 
*/
exports.addUser = (username, password, callback) => {
	auth.hashPassword(password).then(hashPass => persistence.addUser(username, hashPass)).then(user => {
		callback(null, user)
	}).catch(err => {
		callback(err)
	})
}

/**
* Callback for getting user information
* @params {string} username - username to be searched
* @params {string} password - password to be searched
*/
exports.getUser = (username, password, callback) => {
	persistence.getUser(username, password).then(user => {
		callback(null, user)
	}).catch(err => {
		callback(err)
	})
}

/**
* Callback for getting user information
* @params {string} username - username to be searched
* @params {string} password - password to be searched
*/
exports.updateUser = (username, password, callback) => {
	persistence.updateUser(username, password).then(user => {
		callback(null, user)
	}).catch(err => {
		callback(err)
	})
}

/**
* Callback for getting user information
* @params {string} username - username to be searched
*/
exports.deleteUser = (username, callback) => {
	persistence.deleteUser(username).then(user => {
		callback(null, user)
	}).catch(err => {
		callback(err)
	})
}

/**
* Callback for getting user information
* @params {string} username - username to be searched
* @params {string} photoID - ID of photo to be added
* @params {string} location - location of photo
*/
exports.addFavPhoto = (username, photoID, location, callback) => {
	persistence.addFavPhoto(username, photoID, location).then(photo => {
		callback(null, photo)
	}).catch(err => {
		callback(err)
	})
}

/**
* Callback for getting user information
* @params {string} username - username to be searched
*/
exports.getFavPhotos = (username, callback) => {
	persistence.getFavPhotos(username).then(photo => {
		callback(null, photo)
	}).catch(err => {
		callback(err)
	})
}

/**
*Callback for deleting a favourite photo from photos collection
*@params username {string} username - user for photo to be deleted against
*@params {string} photoID - ID of photo to be deleted
*@callback deleteFavPhotos
*/
exports.deleteFavPhotos = (username, photoID, callback) => {
	persistence.deleteFavPhotos(username, photoID).then(photo => {
		callback(null, photo)
	}).catch(err => {
		callback(err)
	})
}
