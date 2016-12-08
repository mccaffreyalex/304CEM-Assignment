'use strict'
const flickr = require('./flickr')
const weather = require('./weather')


exports.extractParam = (request, param) => new Promise((resolve, reject) => {
	if (request.params === undefined || request.params[param] === undefined) reject(new Error(`${param} parameter missing`))
	resolve(request.params[param])
})

/**
 * Searching for Flickr photo by tag.
 * @constructor
 * @param {string} tag - The tag the user enters
 */
exports.searchByTag = tag => new Promise((resolve, reject) => flickr.searchByTag(tag, (err, result) => err ? reject(err) : resolve(result)))

/**
 * Searching for Flickr photo by tag.
 * @constructor
 * @param {string} id - The id of the book.
 */
exports.searchByID = id => new Promise((resolve, reject) => flickr.searchByID(id, (err, result) => err ? reject(err) : resolve(result)))

/**
 * Searching for Flickr photo by tag.
 * @constructor
 * @param {string} location - The title of the book.
 * @param {string} date - The author of the book.
 */
exports.searchWeather = (location, date) => new Promise((resolve, reject) => weather.searchWeather(location, date, (err, result) => err ? reject(err) : resolve(result)))

/**
 * Searching for Flickr photo by tag.
 * @constructor
 * @param {string} searchResults - searchByTag results
 * @param {string} data - searchByID results
 * @param {string} weather - searchWeather results
 */
exports.combinedData = (searchResults, data, weather) => new Promise((resolve, reject) => {
	resolve({
		results: searchResults
        , data: data
        , weather: weather
	})
})


