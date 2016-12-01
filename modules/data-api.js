'use strict'
const flickr = require('./flickr')
const weather = require('./weather')
const schema = require('../schema/schema')
exports.extractParam = (request, param) => new Promise((resolve, reject) => {
    if (request.params === undefined || request.params[param] === undefined) reject(new Error(`${param} parameter missing`))
    resolve(request.params[param])
})
exports.searchByTag = tag => new Promise((resolve, reject) => flickr.searchByTag(tag, (err, result) => err ? reject(err) : resolve(result)))
exports.searchByID = id => new Promise((resolve, reject) => flickr.searchByID(id, (err, result) => err ? reject(err) : resolve(result)))
exports.searchWeather = (location, date) => new Promise((resolve, reject) => weather.searchWeather(location, date, (err, result) => err ? reject(err) : resolve(result)))
exports.combinedData = (searchResults, data, weather) => new Promise((resolve, reject) => {
    resolve({
        results: searchResults
        , data: data
        , weather: weather
    })
})
