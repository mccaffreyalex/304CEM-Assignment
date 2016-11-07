'use strict'
const restify = require('restify')
    , fs = require('fs')
    , ejs = require('ejs')
    , flickr = require('./modules/flickr')
    , html = require('html')
    , port = process.env.PORT || 8081
const server = restify.createServer({
    name: 'restify server'
})
server.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url)
    return next()
})

function test(req, res, next) {
    var testpage = fs.readFileSync('views/index.ejs', 'UTF-8')
    res.end(ejs.render(testpage))
    return next()
}

function getWeather(req, res, next) {
    var image_id = req.params.image_id
    var testpage = fs.readFileSync('views/details.ejs', 'UTF-8')
}

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
server.use(restify.bodyParser())
server.get('/', getIndex)
server.get('test', test)
server.get('details', getWeather)
server.post('results', getFlickrData)
    ///server.post('results', getFlickrInfo);
function getIndex(req, res, next) {
    var indexPage = fs.readFileSync('client/index.html', 'UTF-8')
    res.end(ejs.render(indexPage))
    return next()
}
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
