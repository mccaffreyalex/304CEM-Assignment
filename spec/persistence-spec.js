'use stict'
const frisby = require('frisby')
const hostURL = 'http://localhost:8080/'
const testUser = 'adam'
const testPass = 'smith'
const testPhotoID = '2016'
const testLocation = 'Barcelona'

frisby.create('Adding a user with username/password')
    .post(hostURL +'user', {"username":testUser, "password":testPass}, {json: true})
    .expectStatus(201)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({username: testUser})
.toss()

frisby.create('Adding a user with no password')
    .post(hostURL +'user', {"username":testUser}, {json: true})
    .expectStatus(400)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        "message": "Missing password"
                })
.toss()

frisby.create('Listing a user with correct username/password')
    .get(hostURL+ 'user')
    .expectStatus(200)
    .auth(testUser, testPass, false)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON([{"username":testUser}])
.toss()

frisby.create('Listing a user with incorrect username/password')
    .get(hostURL+ 'user')
    .expectStatus(200)
    .auth('jonny', 'ive')
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON([])
.toss()

frisby.create('Successfully updating a password from smith -> thomas')
    .put(hostURL + 'user', {"password":'thomas'}, {json: true})
    .auth(testUser, testPass, false)
    .expectStatus(200)
    .expectJSON({'username':testUser, "password":'thomas'})
.toss()

frisby.create('Trying to update a user that does not exist')
    .put(hostURL + 'user', {"password":'thomas1'}, {json: true})
    .auth('bob', 'bobob', false)
    .expectStatus(400)
    .expectJSON({
        "message": "User does not exist"
        })
.toss()

frisby.create('Deleting a user')
    .delete(hostURL + 'user')
    .auth(testUser, testPass, false)
    .expectStatus(200)
    .expectHeaderContains('accepts', 'DELETE')
    .expectJSON({
        "message": "Successfully deleted"
    })
.toss()

////========================================================================

frisby.create('Adding favourite')
    .post(hostURL + 'fav', {"photoID":testPhotoID, "location": testLocation}, {json: true})
    .auth(testUser, testPass, false)
    .expectStatus(201)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        "username": testUser
        ,"location": testLocation
        , "photoID": testPhotoID
})
.toss()

frisby.create('Listing favourites')
    .get(hostURL + 'fav')
    .auth(testUser, testPass, false)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectHeaderContains('accepts', 'GET')
    .expectJSON([{"location":testLocation, "photoID":testPhotoID}])
.toss()

frisby.create('Deleting a favourite')
    .delete(hostURL + 'fav', {photoID: testPhotoID}, {json: true})
    .auth(testUser, testPass, false)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectHeaderContains('accepts', 'DELETE')
    .expectJSON({message: 'Successfully deleted'})
.toss()
