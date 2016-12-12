'use strict'
//---------------------------------------------------------------------
const restify = require('restify')
const index = require('./index')
const server = restify.createServer()
const handler = require('./modules/handler')
const defaultPort = 8080
const port = process.env.PORT || defaultPort
//---------------------------------------------------------------------


/**
*Respond function
*@param {string} res - HTTP response
*@param {string} next - next
*@param {string} status - status of response
*@param {string} data - data of response
*@param {string} http_code - HTTP reponse code of request
*@returns {string} response message
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
server.get('/', restify.serveStatic({
    'directory': './client',
    'default': 'index.html'
}))

server.get('/api', handler.search)
server.get('/user', handler.getUser)
server.post('/user', handler.addUser)
server.del('/user', handler.deleteUser)
server.put('/user', handler.updateUser)
server.get('/fav', handler.getFavPhotos)
server.post('/fav', handler.addFavPhoto)
server.del('/fav', handler.deleteFavPhotos)
//---------------------------------------------------------------------

server.listen(port, err => console.log(err || `Server running at: http://localhost:${port}`))


