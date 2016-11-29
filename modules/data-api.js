'use strict'
const flickr = require('./flickr-request')
const flickrInfo = require('./flickr-info-request')
const weather = require('./weather-request')
exports.search = (request, callback) => {
        extractParam(request, 't').then(query => {
            return flickr.searchByTag(query)
        }).then(data => {
            callback(null, data)
        }).catch(err => {
            callback(err)
        })
    }
    ///then flickr.Info.searchByID and parse photoID from .searchByTag into the request
exports.searchID = (request, callback) => {
    extractParam(request, 'i').then(query => {
        return flickrInfo.searchByID(query)
    }).then(data => {
        callback(null, data)
    }).catch(err => {
        callback(err)
    })
}
exports.addUser = (request, callback) => {
    let data
}
const extractParam = (request, param) => new Promise((resolve, reject) => {
    if (request.params === undefined || request.params[param] === undefined) reject(new Error(`${param} parameter missing`))
    resolve(request.params[param])
})