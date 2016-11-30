/*global require describe it xit expect */
/*no eslint errors*/
'use strict'
const flickr = require('../modules/flickr')
describe('The Flickr API', function () {
        xit('should limit the number to 2', function (done) {
            flickr.flickrSearch('London', function (err, searchResults) {
                expect(err).toBe(null)
                expect(searchResults.photos.perpage).toBe(2)
                expect(searchResults.stat).toBe('ok')
                done()
            })
        })
        xit('should have status of ok', function (done) {
            flickr.flickrSearch('London', function (err, searchResults) {
                expect(err).toBe(null)
                expect(searchResults.stat).toBe('ok')
                done()
            })
        })
        xit('should return 0 pages when no photos for the tag can be found', function (done) {
            flickr.flickrSearch('randomtaghere', function (err, searchResults) {
                expect(err).toBe(null)
                expect(searchResults.photos.pages).toBe(0)
                done()
            })
        })
        xit('should contain the tag in the URL', function (done) {
            flickr.flickrSearch('London', function (err, searchResults) {
                expect(err).toBe(null)
                expect(flickr.fullURL).toContain('tags=London')
                done()
            })
        })
    })
    ///tests
    ///when searching for london, the url contains tags="london"
    ///when searching, and no photos show up - undefinded
    ///
