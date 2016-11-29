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
exports.searchByID = query => new Promise((resolve, reject) => {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=47b47ea9fe9d92ff9aac9cc70acb388a&photo_id=${query}&format=json&nojsoncallback=1`
    request.get(url, (err, res, body) => {
        if (err) {
            reject(Error('API call failed'))
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