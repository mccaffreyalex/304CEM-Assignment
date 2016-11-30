'use strict'
const request = require('request')
exports.searchWeather = (location, date, callback) => {
    const url = `http://api.apixu.com/v1/history.json?key=ceac95eb930640de828164828162610&q=${location}&dt=${date}`
    console.log(url)
    request.get(url, (err, res, body) => {
        if (err) callback(Error('API call failed'))
        const json = JSON.parse(body)
        const data = {
            location: `${json.location.name}`
            , country: `${json.location.country}`
            , date: `${json.forecast.forecastday[0].date}`
            , weather: `${json.forecast.forecastday[0].day.condition.text}`
            , weatherURL: `${json.forecast.forecastday[0].day.condition.icon}`
            , sunRise: `${json.forecast.forecastday[0].astro.sunrise}`
            , sunSet: `${json.forecast.forecastday[0].astro.sunset}`
        , }
        callback(null, data)
    })
}
