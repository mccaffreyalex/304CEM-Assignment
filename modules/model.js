'use strict'
const api = require('./data-api')
const model = require('./model')
const persistence = require('./persistence')
exports.searchByTag = (request, callback) => {
    api.extractParam(request, 't').then(tag => {
        return api.searchByTag(tag)
    }).then(searchResults => {
        this.results = searchResults
        return api.searchByID(searchResults.photo_id)
    }).then(data => {
        this.data = data
        return api.searchWeather(request.params.t, data.dateTaken)
    }).then(weather => {
        return api.combinedData(this.results, this.data, weather)
    }).then(data => {
        callback(null, data)
    }).catch(err => {
        callback(err)
    })
}
exports.addUser = persistence.addUser
exports.showUsers = (req, res) => { //lists all users
    persistence.showUsers(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET')
        err ? res.send(err) : res.send(data)
        res.end()
    })
}
exports.addToFavourites = persistence.addToFavourites
exports.showFavourites = (req, res) => { //lists all users
    persistence.showFavourites(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET')
        err ? res.send(err) : res.send(data)
        res.end()
    })
}
exports.deleteFavourite = (req, res) => {
    persistence.deleteFavourite(req.params.photoID, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'DELETE')
        err ? res.send(err) : res.send(data)
        res.end()
    })
}
exports.search = (req, res) => {
    model.searchByTag(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET')
        err ? res.send(400, err) : res.send(200, data)
        res.end()
    })
}
exports.update = (req, res) => {
    persistence.update(req.params.photoID, req.params.photoID, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'PUT')
        err ? res.send(400, err) : res.send(data)
    })
}
