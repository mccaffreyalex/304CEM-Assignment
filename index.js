'use strict'
const restify = require('restify')
const server = restify.createServer()
const model = require('./modules/model')
const schema = require('./schema/schema')
const persistence = require('./modules/persistence')
const port = process.env.PORT || 8080
const status = {
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
    respond(res, next, 'success', data, 200)
}
exports.failure = function failure(res, next, data, http_code) {
        respond(res, next, 'failure', data, http_code)
    }
    ///////////////////////////////////////////////////////////////////////////////////////
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.acceptParser(server.acceptable))
server.use(restify.authorizationParser())
    ///////////////////////////////////////////////////////////////////////////////////////
server.get('/api', model.search) // does search on city - yes ?q=london
server.get('/users', model.showUsers) // shows users - yes
server.post('/users', persistence.userExists, model.addUser) //add new user - yes
server.get('/fav', model.showFavourites) //listing all favourites - yes
server.get('/favauth', model.showFavourites) //listing all favourites with auth - no
server.post('/fav', model.addToFavourites) //creating new favourite - yes, put {"id": in body}
server.del('/fav/:photoID', model.deleteFavourite) //delete fav by id 8080:/fav/alex
    //server.put('/fav')
    ///////////////////////////////////////////////////////////////////////////////////////
server.listen(port, err => console.log(err || `Server running at: http://localhost:${port}`))
