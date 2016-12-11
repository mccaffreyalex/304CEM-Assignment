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
server.get('/api', handler.search) // does search on city - yes ?q=london
server.get('/user', handler.getUser) // shows users DONE
server.post('/user', auth.authorize, handler.addUser) //add new user - DONE
server.del('/user', handler.deleteUser) // delete user DONE
server.put('/user', handler.updateUser) //update user DONE
server.get('/fav', handler.getFavPhotos) //listing all favourites - DONE
server.post('/fav', handler.addFavPhoto) //creating new favourite -  DONE
server.del('/fav', handler.deleteFavPhotos) //delete fav by id 8080:/fav/alex
//server.put('/fav') - need to add this later

    //---------------------------------------------------------------------

/**
     * Parses tag into searchByTag
     * @function
     * @param {string} req - HTTP request
     * @param {string} res - HTTP response
     * @returns {data} photo results, photo data, weather data combined
     */


server.listen(port, err => console.log(err || `Server running at: http://localhost:${port}`))


