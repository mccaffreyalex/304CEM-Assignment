'use strict'
//---------------------------------------------------------------------
const api = require('./data-api')
const persistence = require('./persistence')
const auth = require('./authorize')
//---------------------------------------------------------------------

/**
*@module Model Module
*/

/**
* Callback for searching Flickr & Apixu weather in a promise chain
* @callback searchByTag
* @param {string} request - HTTP request
* @param {callback} callback - the callback that handles the response
* @returns {string} combinedData
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
* @callback addUser
* @param {string} username - username to be added to collection
* @param {string} password - password to be added to collection
* @param {callback} callback - the callback that handles the response
* @throws Will throw error
* @returns {string} user added to users collection
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
* @callback getUser
* @param {string} username - username to be searched
* @param {string} password - password to be searched
* @param {callback} callback - the callback that handles the response
* @returns {string} username/password
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
* @param {string} username - username to be searched
* @param {string} password - password to be searched
* @param {callback} callback - the callback that handles the response
* @returns {string} updated username/password
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
* @param {string} username - username to be searched
* @param {callback} callback - the callback that handles the response
* @returns {string} user deleted
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
* @param {string} username - username to be searched
* @param {string} photoID - ID of photo to be added
* @param {string} location - location of photo
* @param {callback} callback - the callback that handles the response
* @returns {string} new entry in photos collection
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
* @param {string} username - username to be searched
* @param {callback} callback - the callback that handles the response
* @returns {string} photos listed for that username
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
* @callback deleteFavPhotos
* @param {string} username - user for photo to be deleted against
* @param {string} photoID - ID of photo to be deleted
* @param {callback} callback - the callback that handles the response
* @returns {string} photo deleted
*/
exports.deleteFavPhotos = (username, photoID, callback) => {
    persistence.deleteFavPhotos(username, photoID).then(photo => {
        callback(null, photo)
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
