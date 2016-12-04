'use strict'
const restify = require('restify')
const server = restify.createServer()
const model = require('./modules/model')
const db = require('./modules/persistence')
const api = require('./modules/data-api')
const schema = require('./schema/schema')
const status = {
    ok: 200
    , added: 201
    , badRequest: 400
}
server.use(restify.queryParser())
server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.acceptParser(server.acceptable))
server.use(restify.authorizationParser())
    //
server.get('/', (req, res, next) => {
        res.redirect('/api', next)
    })
    //listing all users
server.get('/users', (req, res) => {
        db.showUsers(req, (err, data) => {
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            err ? res.send(err) : res.send(data)
            res.end()
        })
    })
    //listing specific user
server.get('/users/:name', (req, res) => {
        db.showUsers(req.params.name, (err, data) => {
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            err ? res.send(err) : res.send(data)
            res.end()
        })
    })
    //creating new user
server.post('/users', function (req, res, next) {
    const user = new schema.userModel()
    user.username = req.params.username
    user.password = req.params.password
    user.save(function (err) {
        if (err) failure(res, next, 'User not saved', 500)
        success(res, next, user)
    })
})
server.post('/users2', (req, res, next) => {
        db.addUser(req, (err, data) => {
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET, POST')
            err ? res.send(status.badRequest, {
                error: err.message
            }) : res.send(status.added, {
                user: data
            })
            res.end()
        })
    })
    //listing all favourites
server.get('/favourites', (req, res) => {
        db.showFavourites(req, (err, data) => {
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            err ? res.send(err) : res.send(data)
            res.end()
        })
    })
    //creating new favourite
server.post('/favourites/:id', (req, res) => {
        model.addFavourite(req, (err, data) => {
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET, POST')
            err ? res.send(status.badRequest, {
                error: err.message
            }) : res.send(status.added, {
                user: data
            })
            res.end()
        })
    })
    //server.put('/favourites')
    //server.del('/favourites')
server.get('/api', (req, res) => {
    model.searchByTag(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET')
        err ? res.send(status.badRequest, err) : res.send(status.ok, data)
        res.end()
    })
})
const port = 8085
server.listen(port, err => console.log(err || `Server running at: http://localhost:${port}`))
    // udemy
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

function success(res, next, data) {
    respond(res, next, 'success', data, 200)
}

function failure(res, next, data, http_code) {
    respond(res, next, 'failure', data, http_code)
}
const users = {}
var max_user_id = 0
server.get("/udemyuser", function (req, res, next) {
    success(res, next, users)
})
server.get("/udemyuser/:id", function (req, res, next) {
    if (typeof (users[req.params.id]) === 'undefined') {
        failure(res, next, 'User not found', 404)
    }
    success(res, next, users[parseInt(req.params.id)])
})
server.post("/udemyuser", function (req, res, next) {
    const user = req.params
    max_user_id++
    user.id = max_user_id
    users[user.id] = user
    success(res, next, user)
})
server.put("/udemyuser/:id", function (req, res, next) {
    if (typeof (users[req.params.id]) === 'undefined') {
        failure(res, next, 'User not found', 404)
    }
    const user = users[parseInt(req.params.id)]
    const updates = req.params
    for (var field in updates) {
        user[field] = updates[field];
    }
    success(res, next, user)
})
server.del("/udemyuser/:id", function (req, res, next) {
    if (typeof (users[req.params.id]) === 'undefined') {
        failure(res, next, 'User not found', 404)
    }
    delete users[parseInt(req.params.id)]
    success(res, next, [])
})
