'use strict'
const restify = require('restify')
const weatherRequest = require('./modules/weather-request')
const flickr = require('./modules/flickr-request')
const flickrInfo = require('./modules/flickr-info-request')
const server = restify.createServer({
    name: '304CEM Restify Server'
})
const defaultPort = 8081
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.acceptParser(server.acceptable))
server.get('/flickr', function (req, res, next) {
    console.log(req.params.t)
    flickr.flickrSearch(req.params.t, function (err, result) {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})
server.get('/weather', function (req, res, next) {
    console.log(req.params.q)
    console.log(req.params.dt)
    weatherRequest.weatherSearch(req.params.q, req.params.dt, function (err, result) {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})
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
const port = process.env.PORT || defaultPort
server.listen(port, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log('Server running at: ' + port)
    }
})
