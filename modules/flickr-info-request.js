'use strict'
const request = require('request')
exports.flickrInfo = function (photo_id, callback) {
    var options = {
        method: 'GET'
        , url: 'https://api.flickr.com/services/rest/'
        , qs: {
            method: 'flickr.photos.getInfo'
            , api_key: '06978083e5080079f06986a732851025'
            , photo_id: photo_id
            , format: 'json'
            , nojsoncallback: '1'
            , api_sig: '3e50c4d82482102e5278e8d6756eab1a'
        }
    }
    request(options, function (err, res, body) {
        //Check for error
        if (err) throw new Error(err)
        const json = JSON.parse(body)
            ///console.log(JSON.stringify(json, null, 2))
        return callback(null, JSON.parse(body))
    })
}
