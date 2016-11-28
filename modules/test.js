'use strict'
const request = require('request')
let searchByTag = function () {
    return new Promise(function (resolve, reject) {
        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=47b47ea9fe9d92ff9aac9cc70acb388a&tags=london&min_upload_date=1477958400&per_page=1&format=json&nojsoncallback=1`
        request.get(url, (err, res, body) => {
            if (err) {
                reject(Error('failed to make API call'))
            }
            console.log(url)
            const json = JSON.parse(body)
            const data = {
                numberOfPhotos: `${json.photos.perpage}`
                , photo_id: `${json.photos.photo[0].id}`
                , owner: `${json.photos.photo[0].owner}`
                , title: `${json.photos.photo[0].title}`
                , url: 'http://farm' + `${json.photos.photo[0].farm}` + '.staticflickr.com/' + `${json.photos.photo[0].server}` + '/' + `${json.photos.photo[0].id}` + '_' + `${json.photos.photo[0].secret}` + '.jpg'
            }
            resolve(data)
            console.log(data)
        })
    })
}
let searchByID = function (message) {
    return new Promise(function (resolve, reject) {
        const photoID = searchByTag.data.`${json.photos.photo[0].id}`
        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=caa0f2565dcd832a5e8e74a599edae92&photo_id=photoID&format=json&nojsoncallback=1`
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
}
searchByTag().then(function (result) {
    return searchByID(result)
}).then(function (result) {
    console.log('Finished ' + result)
})
