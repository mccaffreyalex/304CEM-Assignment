'use strict'
const request = require('request')
exports.weatherSearch = function (location, date, callback) {
    const options = {
        method: 'GET'
        , url: 'http://api.apixu.com/v1/history.json'
        , qs: {
            key: 'ceac95eb930640de828164828162610'
            , q: location
            , dt: date
        }
    }
    request(options, function (err, res, body) {
        //Check for error
        if (err) throw new Error(err);
        const json = JSON.parse(body)
        console.log(json.location)
        return callback(null, JSON.parse(body))
    })
}
exports.searchWeatherByLocationDate = query => new Promise((resolve, reject) => {
    const url = `http://api.apixu.com/v1/history.json?key=ceac95eb930640de828164828162610&q=${query}&dt=${query}`
    console.log(url)
    request.get(url, (err, res, body) => {
        if (err) {
            reject(Error('API call failed'))
        }
        console.log(url)
        const json = JSON.parse(body)
        resolve(json)
        const data = {
            location: `${json.location.name}`
            , country: `${json.location.country}`
            , date: `${json.forecast.forecastday[0].date}`
            , weather: `${json.forecast.forecastday[0].day.condition.text}`
            , weatherURL: `${json.forecast.forecastday[0].day.condition.icon}`
            , sunRise: `${json.forecast.forecastday[0].astro.sunrise}`
            , sunSet: `${json.forecast.forecastday[0].astro.sunset}`
        , }
        resolve(data)
    })
})