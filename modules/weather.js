'use strict'
const http = require('http')
    , request = require('request')
if (process.argv.length < 3) {
    throw 'missing parameter'
}
let location = process.argv[2]
let date = '2016-11-10'

const options = {
    "method": 'GET'
    , "hostname": 'api.apixu.com'
    , "port": null
    , "path": '/v1/history.json?key=ceac95eb930640de828164828162610&q=' + location + '&dt=' + date
    , "headers": {
        "cache-control": "no-cache"
        , "postman-token": "38727c34-9c2a-0c4e-82f2-6d8689f293fc"
    }
}
const fullUrl = options.hostname + options.path
console.log(fullUrl)
const req = http.request(options, function (res) {
    var data
    res.on('data', function (chunk) {
        data += chunk
    })
    res.on('end', function () {
        ///   var body = Buffer.concat(chunks)
        data = data.replace('undefined', '')
        var json = JSON.parse(data)
        console.log(json)
            ///console.log('The current weather in ' + json.location.name + ' is ' + json.current.condition.text)
    })
})
req.end()