'use strict'
const request = require('request')
exports.flickrSearch = function (tag, callback) {
    const options = {
        method: 'GET'
        , url: 'https://api.flickr.com/services/rest/'
        , qs: {
            method: 'flickr.photos.search'
            , api_key: '47b47ea9fe9d92ff9aac9cc70acb388a'
            , tags: tag
            , min_upload_date: '1477958400'
            , per_page: '2'
            , format: 'json'
            , nojsoncallback: '1'
        }
    }
    console.log('You searched for ' + tag)
    request(options, function (err, res, body) {
        //Check for error
        if (err) throw new Error(err);
        return callback(null, JSON.parse(body))
    })
}

// id = 24824103133
