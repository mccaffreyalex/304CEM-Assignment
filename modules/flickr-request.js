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
            , per_page: '3'
            , format: 'json'
            , nojsoncallback: '1'
        }
    }
    request(options, function (err, res, body) {
        if (err) throw new Error(err);
        return callback(null, JSON.parse(body))
    })
}