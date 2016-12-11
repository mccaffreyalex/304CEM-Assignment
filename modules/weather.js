'use strict'
const request = require('request')

exports.searchWeather = (location, date, callback) => {
	const url = `http://api.apixu.com/v1/history.json?key=ceac95eb930640de828164828162610&q=${location}&dt=${date}`

	request.get(url, (err, res, body) => {
		const json = JSON.parse(body)

		if (err) console.log(err)
		else if (json.hasOwnProperty('error')) callback({
			code: 1003
            , message: 'Location missing/no matching city/this key is only valid for 30 days only'
            , stat: 'fail'
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

