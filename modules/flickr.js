/*global require exports*/
/*eslint no-undef: "error"*/
/*eslint no-console: "error"*/
const http = require('https')
const request = require('request')
    /** This is a description of the foo function. */
exports.flickrSearch = function (tag, callback) {
    const options = {
        'method': 'GET'
        , 'hostname': 'api.flickr.com'
        , 'port': null
        , 'path': '/services/rest/?method=flickr.photos.search&api_key=47b47ea9fe9d92ff9aac9cc70acb388a&tags=' + tag + '&min_upload_date=1477958400&per_page=2&format=json&nojsoncallback=1'
        , 'headers': {
            'cache-control': 'no-cache'
            , 'postman-token': '73132e7b-435d-a463-290b-0509d0ecb2f8'
        }
    }

    console.log('You searched for ' + tag)
    const req = http.request(options, function (res) {
        var data
        res.on('data', function (chunk) {
            data += chunk
        })
        res.on('end', function () {
            ///console.log(JSON.stringify(data))
            const fullURL = options.hostname+options.path
            ///console.log(fullURL)
            data = data.replace('undefined', '')
            callback(null, JSON.parse(data))
        })
    })
    req.end()
}
