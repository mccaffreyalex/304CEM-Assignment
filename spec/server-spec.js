//'use strict'
//const request = require('request')
//const base_url = 'http://localhost:8081/'
//const notFound = 404
//const OK = 200
//
//describe('The server', function() {
//	describe('GET /flickr', function() {
//		it('returns server code 200', function(done) {
//			request.get(base_url + 'flickr?t=london', function(err, res) {
//				expect(err).toBe(null)
//				expect(res.statusCode).toBe(OK)
//				done()
//			})
//		})
//	})
//	describe('GET /madeup', function() {
//		it('returns status code 404 not found', function(done) {
//			request.get(base_url + 'madeup', function(err, res) {
//				expect(err).toBe(null)
//				expect(res.statusCode).toBe(notFound)
//				done()
//			})
//		})
//	})
//})