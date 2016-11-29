///model file
'use strict'
const flickr = require('./flickr-request')
const flickrInfo = require('./flickr-info-request')
const weather = require('./weather-request')
exports.searchTag = (request, callback) => {
    extractParam(request, 't').then(query => {
        return flickr.searchByTag(query)
    }).then(data => {
        callback(null, data)
    }).catch(err => {
        callback(err)
    })
}
exports.searchID = (request, callback) => {
    extractParam(request, 'i').then(query => {
        return flickrInfo.searchByID(query)
    }).then(data => {
        callback(null, data)
    }).catch(err => {
        callback(err)
    })
}
exports.searchWeather = (request, callback) => {
    extractParam(request, 'q').then(query => {
        return weather.searchWeatherByLocationDate(query)
    }).then(data => {
        callback(null, data)
    }).catch(err => {
        callback(err)
    })
}
const extractParam = (request, param) => new Promise((resolve, reject) => {
    if (request.params === undefined || request.params[param] === undefined) reject(new Error(`${param} parameter missing`))
    resolve(request.params[param])
})