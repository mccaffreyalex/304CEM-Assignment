'use strict'
const auth = require('./auth')
const db = require('./db')
const api = require('./data-api')
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
