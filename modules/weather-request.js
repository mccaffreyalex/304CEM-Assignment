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
        if (err) throw new Error(err);
        return callback(null, JSON.parse(body))
    })
}