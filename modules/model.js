'use strict'
//---------------------------------------------------------------------
const api = require('./data-api')
const persistence = require('./persistence')
const bcrypt = require('bcryptjs')
const auth = require('./authorize')
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

exports.addUser = (username, password, callback) => {
	auth.hashPassword(password).then(hashPass => persistence.addUser(username, hashPass)).then(user => {
		callback(null, user)
	}).catch(err => {
		callback(err)
	})
}

exports.getUser = (username, password, callback) => {
	persistence.getUser(username, password).then(user => {
		callback(null, user)
	}).catch(err => {
		callback(err)
	})
}

exports.deleteUser = (username, callback) => {
	persistence.deleteUser(username).then(user => {
		callback(null, user)
	}).catch(err => {
		callback(err)
	})
}

exports.updateUser = (username, password, callback) => {
	persistence.updateUser(username, password).then(user => {
		callback(null, user)
	}).catch(err => {
		callback(err)
	})
}

exports.addFavPhoto = (username, photoID, location, callback) => {
	persistence.addFavPhoto(username, photoID, location).then(photo => {
		callback(null, photo)
	}).catch(err => {
		callback(err)
	})
}

exports.getFavPhotos = (username, callback) => {
	persistence.getFavPhotos(username).then(photo => {
		callback(null, photo)
	}).catch(err => {
		callback(err)
	})
}

exports.deleteFavPhotos = (username, photoID, callback) => {
	persistence.deleteFavPhotos(username, photoID).then(photo => {
		callback(null, photo)
	}).catch(err => {
		callback(err)
	})
}
