'use strict'
const request = require('request')
exports.searchByTag = (tag, callback) => {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=47b47ea9fe9d92ff9aac9cc70acb388a&tags=${tag}&min_upload_date=1477958400&per_page=1&format=json&nojsoncallback=1`
    request.get(url, (err, res, body) => {
        if (err) {
            callback(Error('failed to make API call'))
        }
        console.log(url)
        const json = JSON.parse(body)
        console.log(json.photos.total)
        if (json.photos.total === '0') callback({
            message: 'No photos found with tag'
        })
        else {
            const data = {
                numberOfPhotos: `${json.photos.perpage}`
                , photo_id: `${json.photos.photo[0].id}`
                , owner: `${json.photos.photo[0].owner}`
                , title: `${json.photos.photo[0].title}`
                , url: 'http://farm' + `${json.photos.photo[0].farm}` + '.staticflickr.com/' + `${json.photos.photo[0].server}` + '/' + `${json.photos.photo[0].id}` + '_' + `${json.photos.photo[0].secret}` + '.jpg'
            }
            callback(null, data)
        }
    })
}
exports.searchByID = (id, callback) => {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=1f7feaf699acab1de43f933a021d252b&photo_id=${id}&format=json&nojsoncallback=1`
    request.get(url, (err, res, body) => {
        if (err) {
            callback(Error('failed to make API call'))
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
        callback(null, data)
    })
}
