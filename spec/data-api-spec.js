const frisby = require('frisby')
const hostURL = 'http://localhost:8080/'
const correctTag = 'New York'
const incorrectTag = 'randomtaghere'
frisby.create('API /GET should return 200 for a successful search')
    .get(hostURL + 'api?t=' + correctTag)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(
             {
              "results": {
                "searchTag": correctTag,
                "requestStatus": "ok"
              }
            }
        )
.toss()

//location failed

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
