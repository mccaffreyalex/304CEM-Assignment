'use strict'
const request = require('request')

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
