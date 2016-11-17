/*global require process*/
'use strict'
const restify = require('restify')
    , fs = require('fs')
    , ejs = require('ejs')
    , flickr = require('./modules/flickr-request')
    , weatherRequest = require('./modules/weather-request')
    , port = process.env.PORT || 8081
    , server = restify.createServer({
        name: '304CEM Restify Server'
    })
server.use(restify.queryParser())
server.use(restify.acceptParser(server.acceptable))
server.use(restify.bodyParser())

function getFlickrData(req, res, next) {
    var address = req.params.address
    var testPage = fs.readFileSync('client/search.html', 'UTF-8')
    flickr.flickrSearch(address.split(' ').join('%20'), function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            res.end(ejs.render(testPage, {
                Address: address
                , flickrData: data
            }))
        }
    })
}

function getIndex(req, res, next) {
    var indexPage = fs.readFileSync('client/index.html', 'UTF-8')
    res.end(ejs.render(indexPage))
    return next()
}
server.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url)
    return next()
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
server.post('results', getFlickrData)
server.listen(port, function () {
    console.log('API running at port: ' + port + '. Go to localhost:8081')
})
server.get('/.*', function (req, res, next) {
    fs.readFile(__dirname + req.url, function (err, data) {
        var dotoffset = req.url.lastIndexOf('.')
        var mimetype = dotoffset == -1 ? 'text/plain' : {
            '.html': 'text/html'
            , '.ico': 'image/x-icon'
            , '.jpg': 'image/jpeg'
            , '.png': 'image/png'
            , '.gif': 'image/gif'
            , '.css': 'text/css'
            , '.js': 'text/javascript'
        }[req.url.substr(dotoffset)]
        res.setHeader('Content-type', mimetype)
        res.writeHead(200, {
            'Content-Type': mimetype
        })
        res.end(data)
            //console.log(err + req.url, mimetype );
        next()
    })
})