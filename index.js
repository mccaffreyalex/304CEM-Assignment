'use strict'
//---------------------------------------------------------------------
const restify = require('restify')
const index = require('./index')
const server = restify.createServer()
const handler = require('./modules/handler')
const auth = require('./modules/authHandler')
const defaultPort = 8080
const port = process.env.PORT || defaultPort
//---------------------------------------------------------------------
/**
     * Shows all records in the photos collection
     * @function
     * @param {string} res - HTTP response
     * @param {string} next - HTTP response
     * @param {string} status - status
     * @param {string} data - data
     * @param {string} http_code - HTTP code
     * @returns
     */

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
	respond(res, next, 'success', data, index.status.ok)
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
server.get('/api', handler.search)
server.get('/user', handler.getUser)
server.post('/user', handler.addUser)
server.del('/user', handler.deleteUser)
server.put('/user', handler.updateUser)
server.get('/fav', handler.getFavPhotos)
server.post('/fav', handler.addFavPhoto)
server.del('/fav', handler.deleteFavPhotos)
//---------------------------------------------------------------------

/**
     * Parses tag into searchByTag
     * @function
     * @param {string} req - HTTP request
     * @param {string} res - HTTP response
     * @returns {data} photo results, photo data, weather data combined
     */


server.listen(port, err => console.log(err || `Server running at: http://localhost:${port}`))


