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
exports.searchByTag = query => new Promise((resolve, reject) => {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=47b47ea9fe9d92ff9aac9cc70acb388a&tags=${query}&min_upload_date=1477958400&per_page=1&format=json&nojsoncallback=1`
    request.get(url, (err, res, body) => {
        if (err) {
            reject(Error('API call failed'))
        }
        console.log(url)
        const json = JSON.parse(body)
        const data = {
            numberOfPhotos: `${json.photos.perpage}`
            , photoID: `${json.photos.photo[0].id}`
            , owner: `${json.photos.photo[0].owner}`
            , title: `${json.photos.photo[0].title}`
            , url: 'http://farm' + `${json.photos.photo[0].farm}` + '.staticflickr.com/' + `${json.photos.photo[0].server}` + '/' + `${json.photos.photo[0].id}` + '_' + `${json.photos.photo[0].secret}` + '.jpg'
        }
        resolve(data)
    })
})
exports.searchByID = query => new Promise((resolve, reject) => {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=caa0f2565dcd832a5e8e74a599edae92&photo_id=${query}&format=json&nojsoncallback=1`
    request.get(url, (err, res, body) => {
        if (err) {
            reject(Error('failed to make API call'))
        }
        console.log(url)
        const json = JSON.parse(body)
        const data = {
            ownerName: `${json.photo.owner.realname}`
            , photoTitle: `${json.photo.title._content}`
            , photoID: `${json.photo.id}`
            , dateTaken: `${json.photo.dates.taken}`.substring(0, 10)
            , photoURL: 'http://farm' + `${json.photo.farm}` + '.staticflickr.com/' + `${json.photo.server}` + '/' + `${json.photo.id}` + '_' + `${json.photo.secret}` + '.jpg'
            , requestStatus: `${json.stat}`
        }
        resolve(data)
    })
})
