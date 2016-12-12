'use strict'

const request = require('request')

/**
 * Searching for Flickr photo by tag
 * @function
 * @callback searchByTag
 * @param {string} tag - The tag the user enters
 * @param {callback} callback - the callack that handles the response
 * @returns {JSON} - search results based on the tag
 */
exports.searchByTag = (tag, callback) => {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=47b47ea9fe9d92ff9aac9cc70acb388a&tags=${tag}&min_upload_date=1477958400&per_page=1&format=json&nojsoncallback=1`

    request.get(url, (err, res, body) => {
        /* istanbul ignore next */ //only fails if Flickr API is down
        if (err) callback(Error('failed to make API call'))
        const json = JSON.parse(body)

        if (json.photos.total === '0') callback({
            message: 'No photos found with tag'
        })
        else {
            const data = {
                apiURL: url
                , searchTag: tag
                , numberOfPhotos: `${json.photos.perpage}`
                , photo_id: `${json.photos.photo[0].id}`
                , owner: `${json.photos.photo[0].owner}`
                , title: `${json.photos.photo[0].title}`
                , url: 'http://farm' + `${json.photos.photo[0].farm}` + '.staticflickr.com/' + `${json.photos.photo[0].server}` + '/' + `${json.photos.photo[0].id}` + '_' + `${json.photos.photo[0].secret}` + '.jpg'
                , requestStatus: `${json.stat}`
            }

            callback(null, data)
        }
    })
}

/**
 * Searching for Flickr photo by ID
 * @function
 * @callback searchByID
 * @param {string} id - id of photo from searchByTag function
 * @param {callback} callback - the callack that handles the response
 * @returns {JSON} - search results based on the id
 */
exports.searchByID = (id, callback) => {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=47b47ea9fe9d92ff9aac9cc70acb388a&photo_id=${id}&format=json&nojsoncallback=1`

    request.get(url, (err, res, body) => {
        /* istanbul ignore next */ //only fails if Flickr API is down
        if (err) callback(Error('failed to make API call'))
        const json = JSON.parse(body)

        if (json.stat === 'fail') callback(json)
        else {
            const substringMax = 10
            const data = {
                ownerName: `${json.photo.owner.realname}`
                , photoTitle: `${json.photo.title._content}`
                , photoID: `${json.photo.id}`
                , dateTaken: `${json.photo.dates.taken}`.substring(0, substringMax)
                , photoURL: 'http://farm' + `${json.photo.farm}` + '.staticflickr.com/' + `${json.photo.server}` + '/' + `${json.photo.id}` + '_' + `${json.photo.secret}` + '.jpg'
                , requestStatus: `${json.stat}`
            }

            callback(null, data)
        }
    })
}
