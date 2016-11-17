'use strict'
const restify = require('restify')
    , weatherRequest = require('./modules/weather-request')
    , server = restify.createServer()
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.acceptParser(server.acceptable))
const defaultPort = 8081
server.get('/', function (req, res, next) {
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

const port = process.env.PORT || defaultPort
server.listen(port, function(err){
    if (err) {
        console.log(err)
    }
    else {
        console.log('App running at: ' + port)
    }
})