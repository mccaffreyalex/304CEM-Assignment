'use strict'
const request = require('request')
exports.flickrInfo = function (photo_id, callback) {
    var options = {
        method: 'GET'
        , url: 'https://api.flickr.com/services/rest/'
        , qs: {
            method: 'flickr.photos.getInfo'
            , api_key: '47b47ea9fe9d92ff9aac9cc70acb388a'
            , photo_id: photo_id
            , format: 'json'
            , nojsoncallback: '1'
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

https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=d8f737135d93252faa1ccdfd815671f8&photo_id=30531934300&format=json&nojsoncallback=1&auth_token=72157672605741584-b927e4e8c259ca40&api_sig=1caac0a1356f1c801c0cc0e767fd193b

exports.flickrInfo = function flickrInfo (req, res, next) {
    const photo_id = req.query.q
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=47b47ea9fe9d92ff9aac9cc70acb388a&tags=${tag}&min_upload_date=1477958400&per_page=1&format=json&nojsoncallback=1`
    request.get(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            const books = []
            for (let i = 0; i < 1; i++) {
                let book = {
                    id: JSON.parse(body)
                }
                books.push(book)
            }
            res.send(books)
        }
    })
}