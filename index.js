'use strict'
const restify = require('restify')
const server = restify.createServer()
const model = require('./modules/model')
const status = {
    ok: 200
    , added: 201
    , badRequest: 400
}
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.acceptParser(server.acceptable))
server.use(restify.authorizationParser())
server.get('/', (req, res, next) => {
    res.redirect('/api', next)
})
server.get('/api', (req, res) => {
        model.searchByTag(req, (err, data) => {
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            err ? res.send(status.badRequest, err) : res.send(status.ok, data)
            res.end()
        })
    })
    ///server.post('/users', users.validateUser, users.add) // add a new user to the DB (pending confirmation)
    ///server.post('/users/confirm/:username', users.validateCode, users.confirm) // confirm a pending user
    ///server.del('/users/:username', authorization.authorize, users.delete) // delete a user
const port = process.env.PORT || 8085
server.listen(port, err => console.log(err || `Server running at: ${port}`))
    /*
    server.get('/flickr', flickr.flickrSearch)
    server.get('/flickr-info', function (req, res, next) {
        console.log(req.params.i)
        flickrInfo.flickrInfo(req.params.i, function (err, result) {
            if (err) {
                console.log(err)
            }
            else {
                res.send(result)
            }
        })
    })
    server.get('/flickr-info', flickrInfo.flickrInfo)
    server.get('/weather', function (req, res, next) {
            console.log(req.params.q, req.params.dt)
            weatherRequest.weatherSearch(req.params.q, req.params.dt, function (err, result) {
                if (err) {
                    console.log(err)
                }
                else {
                    res.send(result)
                }
            })
        })
        */
