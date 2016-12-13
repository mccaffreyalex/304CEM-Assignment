'use strict'
//---------------------------------------------------------------------
const restify = require('restify')
const server = restify.createServer()
const handler = require('./modules/handler')
const defaultPort = 8080
const port = process.env.PORT || defaultPort
//---------------------------------------------------------------------

server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.acceptParser(server.acceptable))
server.use(restify.authorizationParser())
//---------------------------------------------------------------------
server.get('/', restify.serveStatic({
	'directory': './apidoc',
	'default': 'index.html'
}))

/**
*@api {GET} /api [Searches Flickr/Apixu for photo/weather]
*@apiName Search API
*@apiGroup user
*@apiParam {String} [t] Users tag
*@apiDescription Allows user to search for photos and find weather conditions
*@apiSuccessExample {JSON} Success-Response:
*{
* "results": {
*    "apiURL": "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=47b47ea9fe9d92ff9aac9cc70acb388a&tags=new york&min_upload_date=1477958400&per_page=1&format=json&nojsoncallback=1",
*   "searchTag": "new york",
*   "numberOfPhotos": "1",
*   "photo_id": "31579020866",
*   "owner": "66430340@N07",
*   "title": "Barclays Center Arena - 20161213_0430",
*   "url": "http://farm1.staticflickr.com/767/31579020866_ef645376bb.jpg",
*   "requestStatus": "ok"
* },
* "data": {
* "ownerName": "Atlantic Yards Watch Web Cam 4",
*  "photoTitle": "Barclays Center Arena - 20161213_0430",
*   "photoID": "31579020866",
*   "dateTaken": "2016-12-13",
*   "photoURL": "http://farm1.staticflickr.com/767/31579020866_ef645376bb.jpg",
*   "requestStatus": "ok"
* },
* "weather": {
*    "location": "New York",
*    "country": "United States of America",
*    "date": "2016-12-13",
*    "weatherCondition": "Overcast",
*    "weatherURL": "//cdn.apixu.com/weather/64x64/day/122.png",
*    "sunRise": "07:12 AM",
*    "sunSet": "04:29 PM"
*  }
*}
*@apiErrorExample {JSON} Error-Response:
*HTTP/1.1 400 Bad Request
*{
* "code": 1003,
*  "message": "Location missing/no matching city/this key is only valid for 30 days only",
*"stat": "fail"
*}
*/
server.get('/api', handler.search)

/**
*@api {GET} /user [Searches for user details]
*@apiName GET User
*@apiGroup Registered User
*@apiDescription Allows user to retrieve information about them
*@apiSuccessExample {JSON} Success-Response:
*HTTP/1.1 200 OK
*[
*  {
*    "_id": "584f416f88a0f83ac8aeb4bc",
*    "username": "alex",
*    "password": "football",
*    "__v": 0
*  }
*]
*/
server.get('/user', handler.getUser)//reg

/**
*@api {POST} /user [Creates new user]
*@apiName POST User
*@apiGroup User
*@apiDescription Create a new user
*@apiSuccessExample {JSON} Success-Response:
*HTTP/1.1 200 OK
*{
*  "__v": 0,
*  "username": "simon",
*  "password": "$2a$10$zpJ.wYFyG8eTY2SbWukPFOrZ5/W.GcUdmxwkKTLihrcTPD8K/JH06",
*  "_id": "584fc664b1ce23325d2b7568"
*}
*@apiErrorExample {JSON} Error-Response:
*HTTP/1.1 400 Bad Request
*{
*  "message": "Missing password"
*}
*/
server.post('/user', handler.addUser)

/**
*@api {DELETE} /user [Deletes user]
*@apiName DELETE User
*@apiGroup Registered User
*@apiDescription Deletes a registered user
*@apiSuccessExample {JSON} Success-Response:
*HTTP/1.1 201 Created
*{
*  "message": "Successfully deleted"
*}
*@apiError {JSON} Error-Response:
*Username missing
*/
server.del('/user', handler.deleteUser)//reg

/**
*@api {PUT} /user [Updates user details]
*@apiName PUT user
*@apiGroup Registered User
*@apiDescription Updates user details
*@apiSuccessExample {JSON} Success-Response:
*HTTP/1.1 200 OK
*{
*  "_id": "584f416f88a0f83ac8aeb4bc",
*  "username": "simon",
*  "password": "football", <----- New Password
*  "__v": 0
*}
*@apiErrorExample {json} Error-Response:
*HTTP/1.1 400 Bad Request
*{
*  "message": "Username/password missing"
*}
*/
server.put('/user', handler.updateUser)//reg

/**
*@api {GET} /fav [Gets list of favourite photos]
*@apiName GET favourites
*@apiGroup Registered User
*@apiDescription Retrieving user favourites
*@apiSuccessExample {json} Success-Response:
*HTTP/1.1 200 OK
*{
*  "__v": 0,
*  "username": "simon",
*  "photoID": "30798394723",
*  "location": "Birmingham",
*  "_id": "584fc8c67ea28532a487e249"
*}
*@apiErrorExample {json} Error-Response:
*HTTP/1.1 400 Bad Request
*{
*  "message": "Username/photoID/location missing"
*}
*/
server.get('/fav', handler.getFavPhotos) //reg

/**
*@api {POST} /fav [Adds favourite to collection]
*@apiName POST favourite
*@apiGroup Registered User
*@apiDescription Adding photo to favourites collection
*@apiSuccessExample {json} Success-Response:
*HTTP/1.1 201 Created
*{
*  "__v": 0,
*  "username": "simon",
*  "photoID": "354548394723",
*  "location": "Paris",
*  "_id": "584fc9b27ea28532a487e24c"
*}
*@apiErrorExample {json} Error-Response:
*HTTP/1.1 400 Bad Request
*{
*  "message": "Username/photoID/location missing"
*}
*/
server.post('/fav', handler.addFavPhoto)//reg

/**
*@api {DELETE} /fav [Deletes photo from collection]
*@apiName DELETE favourite
*@apiGroup Registered User
*@apiDescription Deleting a photo from the favourites collection
*@apiSuccessExample {json} Success-Response:
*HTTP/1.1 200 OK
*{
*  "message": "Successfully deleted"
*}
*@apiError PhotoID not found
*/
server.del('/fav', handler.deleteFavPhotos)//reg
//---------------------------------------------------------------------

server.listen(port, err => console.log(err || `Server running at: http://localhost:${port}`))


