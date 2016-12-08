const frisby = require('frisby')
const hostURL = 'http://localhost:8080/'
const correctTag = 'coventry'
const incorrectTag = 'randomtaghere'
frisby.create('API /GET should return 200 for a successful search')
    .get(hostURL + 'api?t=' + correctTag)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(
             {
              "results": {
                "apiURL": "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=47b47ea9fe9d92ff9aac9cc70acb388a&tags=coventry&min_upload_date=1477958400&per_page=1&format=json&nojsoncallback=1",
                "searchTag": "coventry",
                "numberOfPhotos": "1",
                "photo_id": "30662421194",
                "owner": "79839874@N04",
                "title": "Day 342 of 366 - Old Canley Hall!",
                "url": "http://farm1.staticflickr.com/58/30662421194_75f1465f1e.jpg",
                "requestStatus": "ok"
              }
            }   
        )
.toss()

frisby.create('My API should return 400 for a failed search')
    .get(hostURL + 'api?t=' + incorrectTag)
    .expectStatus(400)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(
            {
                "message": "No photos found with tag"
            }
)
.toss()
