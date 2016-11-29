'use strict'
const restify = require('restify')
const server = restify.createServer()
    ///
const flickr = require('./modules/flickr-request')
const flickrInfo = require('./modules/flickr-info-request')
const weatherRequest = require('./modules/weather-request')
    ///
const api = require('./modules/data-api')
const status = {
        ok: 200
        , added: 201
        , badRequest: 400
    }
    ////
server.use(restify.queryParser())
server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.acceptParser(server.acceptable))
server.use(restify.authorizationParser())
    ////
server.get('/', (req, res, next) => {
    res.redirect('/api', next)
})
server.get('/api', (req, res) => {
    api.search(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET')
        if (err) {
            res.send(status.badRequest, {
                error: err.message
            })
        }
        else {
            res.send(status.ok, data)
        }
        res.end()
    })
})
server.get('/api/id', (req, res) => {
    api.searchID(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET')
        if (err) {
            res.send(status.badRequest, {
                error: err.message
            })
        }
        else {
            res.send(status.ok, data)
        }
        res.end()
    })
})
server.post('/accounts', (req, res) => {
    console.log('test')
    api.addUser(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'POST')
        if (err) {
            res.send(status.badRequest, {
                error: err.message
            })
        }
        else {
            res.send(status.added, {
                user: data
            })
        }
        res.end()
    })
})
const port = process.env.PORT || 8085
server.listen(port, err => console.log(err || `Server running at: ${port}`))
    ////
    /*server.get('/flickr', flickr.flickrSearch)
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