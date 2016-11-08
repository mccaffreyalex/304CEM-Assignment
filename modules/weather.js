const http = require('https')
const request = require('request')
exports.weatherSearch = function (location, date, callback) {
    location = 'London'
    date = '2016-11-01'
    const options = {
        'method': 'GET'
        , 'hostname': 'api.apixu.com'
        , 'port': null
        , 'path': '/v1/history.json?key=ceac95eb930640de828164828162610&q=' + location + '&' + date + '=2016-11-01'
        , 'headers': {
            'cache-control': 'no-cache'
            , 'postman-token': '86f59019-7302-1a28-7d2f-27cb88464dc6'
        }
    }
    console.log('You search for the weather in ' + options.qs.q + ' on ' + options.qs.dt)
    const req = http.request(options, function (res) {
        var data
        res.on('data', function (chunk) {
            data += chunk
        })
        res.on('end', function () {
            location = 'London'
            date = '2016-11-01'
            fullURL = options.hostname + options.path
            console.log(fullURL)
            console.log(data)
            callback(null, JSON.parse(data))
        })
    })
    req.end()
}