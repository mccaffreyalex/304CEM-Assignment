'use strict'
const request = require('request')
const base_url = 'http://localhost:8081/'
describe('The server', function () {
    describe('GET /flickr', function () {
        it('returns server code 200', function (done) {
            request.get(base_url + 'flickr?t=london', function (error, response, body) {
                expect(response.statusCode).toBe(200)
                done()
            })
        })
    })
    describe('GET /madeup', function () {
        it('returns status code 404 not found', function (done) {
            request.get(base_url + 'madeup', function (error, response, body) {
                expect(response.statusCode).toBe(404)
                done()
            })
        })
    })
})