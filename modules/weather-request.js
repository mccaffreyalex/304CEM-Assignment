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
            ///console.log(JSON.stringify(json, null, 2))
        console.log(json.location)
            ///console.log(json.forecast.forecastday[0].date)
        return callback(null, JSON.parse(body))
    })
}
