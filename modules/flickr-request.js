'use strict'
const request = require('request')
exports.flickrSearch = function flickrSearch(req, res, next) {
    const tag = req.query.q
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