/// spec/flickr-spec.js
'use strict'
const flickr = require('../modules/flickr')
describe('The Flickr API', function () {
        it('should limit the number to 2', function (done) {
            const tag = 'London'
            flickr.flickrSearch(tag, function (err, searchResults) {
                expect(searchResults.photos.perpage).toBe(2)
                expect(searchResults.stat).toBe('ok')
                done()
            });
        })
        it('should have status of 200', function (done) {
            const tag = 'London'
            flickr.flickrSearch(tag, function (err, searchResults) {
                expect(searchResults.stat).toBe('ok')
                done()
            });
        })
        xit('should contain the tag in the url', function (done) {
            const tag = 'London'
            flickr.flickrSearch(tag, function (err, searchResults) {
                expect(searchResults.fullURL).toContain("tags=London")
                done()
            });
        })
        it('should return 0 pages when no photos for the tag can be found', function (done) {
            const tag = 'randomtaghere' ///random tag
            flickr.flickrSearch(tag, function (err, searchResults) {
                expect(searchResults.photos.pages).toBe(0)
                done()
            });
        })
    })
    ///tests
    ///when searching for london, the url contains tags="london"
    ///when searching, 2 photos will be returned = per_page=2
    ///when searching, and no photos show up - undefinded
    ///
