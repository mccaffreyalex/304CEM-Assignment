'use strict'
const http = require('http')
const request = require('request')

exports.weatherSearch = function(location, date, callback) {
	const options = {
		'method': 'GET'
        , 'hostname': 'api.apixu.com'
        , 'port': null
        , 'path': '/v1/history.json?key=ceac95eb930640de828164828162610&q=' + location + '&dt=' + date
        , 'headers': {
	'cache-control': 'no-cache'
            , 'postman-token': '38727c34-9c2a-0c4e-82f2-6d8689f293fc'
}
	}

	console.log('You searched for the weather in ' + location + ' on ' + date)
	const req = http.request(options, function(res) {
		let data

		res.on('data', function(chunk) {
			data += chunk
		})
		res.on('end', function() {
			const fullURL = options.hostname + options.path

			console.log(fullURL)
			data = data.replace('undefined', '')
			callback(null, JSON.parse(data))
		})
	})

	req.end()
}
