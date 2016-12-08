'use strict'
//---------------------------------------------------------------------
const restify = require('restify')
const index = require('./index')
const server = restify.createServer()
const model = require('./modules/model')
const defaultPort = 8080
const port = process.env.PORT || defaultPort
//---------------------------------------------------------------------

exports.status = {
	ok: 200
    , added: 201
    , badRequest: 400
}

function respond(res, next, status, data, http_code) {
	const response = {
		'status': status
        , 'data': data
	}

	res.setHeader('content-type', 'application/json')
	res.writeHead(http_code)
	res.end(JSON.stringify(response))
	return next()
}
exports.success = function success(res, next, data) {
	respond(res, next, 'success', data, 201)
}
exports.failure = function failure(res, next, data, http_code) {
	respond(res, next, 'failure', data, http_code)
}
//---------------------------------------------------------------------
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.acceptParser(server.acceptable))
server.use(restify.authorizationParser())
//---------------------------------------------------------------------
server.get('/api', model.search) // does search on city - yes ?q=london
server.get('/users', model.showUsers) // shows users - yes
server.post('/users', model.addUser) //add new user - yes
server.del('/users', model.deleteUser) // delete user
server.get('/fav', model.showFavourites) //listing all favourites - yes
server.post('/fav', model.addToFavourites) //creating new favourite - yes, put {"id": in body}
server.del('/fav/:photoID', model.deleteFavourite) //delete fav by id 8080:/fav/alex
//server.put('/fav') - need to add this later
server.put('/fav/.*', model.update) //update photoID with location
    //---------------------------------------------------------------------
server.listen(port, err => console.log(err || `Server running at: http://localhost:${port}`))
