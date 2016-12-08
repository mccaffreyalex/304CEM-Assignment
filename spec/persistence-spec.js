const frisby = require('frisby')
const hostURLUser = 'http://localhost:8080/users'
const hostURLFav = 'http://localhost:8080/fav'
const testUser = 'josh'
const testPass = 'pass'
const testPhotoID = '2016'
const testLocation = 'Barcelona'
const updatedLocation = 'Coventry'

frisby.create('Adding a user')
    .post(hostURLUser, {"username":testUser, "password":testPass})
    .expectStatus(201)
    .expectHeaderContains('content-type', 'application/json')
    .expectBodyContains(testUser)
    .expectJSON({
        "data": {
            "password": testPass
            , "username": testUser
        }
    })
.toss()

frisby.create('Listing users')
    .get(hostURLUser)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON([{"username":testUser, "password":testPass}])
.toss()

frisby.create('Deleting a user')
        .delete(hostURLUser, {"username":testUser, "password":testPass})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectHeaderContains('accepts', 'DELETE')
        .expectJSON({"ok":1, "n":1})
.toss()

//========================================================================

frisby.create('Adding favourite')
        .post(hostURLFav, {"photoID":testPhotoID, "location": testLocation})
        .expectStatus(201)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
        "data": {
            "location": testLocation
            , "photoID": testPhotoID
        }
    })
.toss()

frisby.create('Listing favourites')
        .get(hostURLFav)
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectHeaderContains('accepts', 'GET')
        .expectJSON([{"location":testLocation, "photoID":testPhotoID}])
.toss()

frisby.create('Updating a favourite location from Barcelona to Coventry')
        .put(hostURLFav + '/' + testPhotoID, {"photoID":testPhotoID, "location": updatedLocation})
        .expectStatus(200)
        //.expectJSON({"location":testLocation, "photoID":testPhotoID})
.toss()

frisby.create('Deleting a favourite')
        .delete(hostURLFav + '/' + testPhotoID)
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({"ok":1, "n":1})
.toss()
