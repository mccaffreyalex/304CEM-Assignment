const frisby = require('frisby')
const hostURL = 'http://localhost:8080/'
const correctTag = 'Birmingham'
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
<<<<<<< HEAD
=======


/*
'use strict'
const model = require('../modules/model')
describe('My API', function () {
    it('should check the request was successful', function (done) {
        model.searchByTag('api?t=coventry', function (err, searchResults) {
            console.log(searchResults)
            console.log(err)
            expect(err).toBe(null)
            done()
        })
    })
    it('should check that the request was successful', function (done) {
        const date = '2016-12-01'
        const location = 'London'
        weather.searchWeather(location, date, function (err, searchResults) {
            expect(err).toBe(null)
            expect(searchResults.location).toBe(location)
            expect(searchResults.date).toBe(date)
            done()
        })
    })
})
*/
>>>>>>> refs/remotes/origin/feature/develop
