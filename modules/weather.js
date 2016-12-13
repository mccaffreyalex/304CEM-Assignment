'use strict'
const request = require('request')

/**
*@module Weather Module
*/

/**
*Searching Apixu for weather conditions based on location & date
*@param {string} location - location
*@param {string} date - date
*@returns {JSON} - returns weather conditions based on location & date
*@callback - returns data to data-api.js
*@throws Will throw error if JSON contains 'error', most likely because location is not included or date format is incorrect
*/

exports.searchWeather = (location, date, callback) => {
	const url = `http://api.apixu.com/v1/history.json?key=ceac95eb930640de828164828162610&q=${location}&dt=${date}`

	request.get(url, (err, res, body) => {
		const json = JSON.parse(body)
        /* istanbul ignore next */ //only fails if Apixu API is down

		if (err) console.log(err)
		else if (json.hasOwnProperty('error')) callback({
			code: 1003
            , message: 'Location missing/no matching city/this key is only valid for 30 days only'
            , stat: 'fail'
		})
		else if (json.hasOwnProperty('error')) callback({
			code: 1007, message: 'dt missing or in wrong format (yyyy-MM-dd)'
		})
		else {
			const data = {
				location: `${json.location.name}`
                , country: `${json.location.country}`
                , date: `${json.forecast.forecastday[0].date}`
                , weatherCondition: `${json.forecast.forecastday[0].day.condition.text}`
                , weatherURL: `${json.forecast.forecastday[0].day.condition.icon}`
                , sunRise: `${json.forecast.forecastday[0].astro.sunrise}`
                , sunSet: `${json.forecast.forecastday[0].astro.sunset}`
            , }

			callback(null, data)
		}
	})
}

