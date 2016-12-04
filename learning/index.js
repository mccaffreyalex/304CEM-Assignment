'use strict'
const restify = require('restify')
const db = require('./schema')
const server = restify.createServer()
server.use(restify.queryParser())
server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.acceptParser(server.acceptable))

function respond(res, next, status, data, http_code) {
    var response = {
        'status': status
        , 'data': data
    }
    res.setHeader('content-type', 'application/json')
    res.writeHead(http_code)
    res.end(JSON.stringify(response))
    return next()
}

function success(res, next, data) {
    respond(res, next, 'success', data, 200)
}

function failure(res, next, data, http_code) {
    respond(res, next, 'failure', data, http_code)
}
const users = {}
var max_user_id = 0
server.get('/', function (req, res, next) {
    success(res, next, users)
})
server.get('/user/:id', function (req, res, next) {
    if (typeof (users[req.params.id]) === 'undefined') {
        failure(res, next, 'The specified user could not be found in the database', 404)
    }
    success(res, next, users[parseInt(req.params.id)])
})
server.post('/users', function (req, res, next) {
    const user = new db.userModel()
    user.username = req.params.username
    user.password = req.params.password
    user.save(function (err) {
        if (err) failure(res, next, 'User not saved', 500)
        success(res, next, user)
    })
})
server.put('/user/:id', function (req, res, next) {
    if (typeof (users[req.params.id]) === 'undefined') {
        failure(res, next, 'The specified user could not be found in the database', 404)
    }
    var user = users[parseInt(req.params.id)]
    var updates = req.params
    for (var field in updates) {
        user[field] = updates[field]
    }
    success(res, next, user)
})
server.del('/user/:id', function (req, res, next) {
    if (typeof (users[req.params.id]) === 'undefined') {
        failure(res, next, 'The specified user could not be found in the database', 404)
    }
    delete users[parseInt(req.params.id)]
    success(res, next, [])
})
const port = 8087
server.listen(port, err => console.log(err || `Server running at: http://localhost:${port}`))
