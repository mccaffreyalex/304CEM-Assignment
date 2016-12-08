/*global require describe it xit expect */
/*no eslint errors*/
'use strict'
const flickr = require('../modules/flickr')
    describe('The Flickr API', function () {
    it('should limit the number of photos to 1', function (done) {
        flickr.searchByTag('London', function (err, searchResults) {
            expect(err).toBe(null)
            expect(searchResults.numberOfPhotos).toBe('1')
            expect(searchResults.requestStatus).toBe('ok')
            done()
        })
    })
    it('should have status of ok on successful requests', function (done) {
        flickr.searchByTag('London', function (err, searchResults) {
            expect(err).toBe(null)
            expect(searchResults.requestStatus).toBe('ok')
            done()
        })
    })
    it('should return 0 pages when no photos for the tag can be found', function (done) {
        flickr.searchByTag('randomtaghere', function (err, searchResults) {
            expect(err.message).toContain('tag')
            done()
        })
    })
    it('should contain the tag in the URL', function (done) {
        flickr.searchByTag('London', function (err, searchResults) {
            expect(err).toBe(null)
            expect(searchResults.apiURL).toContain('tags=London')
            done()
        })
    })
})
describe('The Flickr-Info API', function () {
    it('confirm it has searched for the correct image', function (done) {
        flickr.searchByID('24824103133', function (err, searchResults) {
            expect(err).toBe(null)
            expect(searchResults.photoID).toBe('24824103133')
            done()
        })
    })
    it('should return error when no photo id is entered', function (done) {
        flickr.searchByID('', function (err, searchResults) {
            expect(err.stat).toBe('fail')
            expect(err.code).toBe(1)
            expect(err.message).toContain('not found')
            done()
        })
    })
    it('should return error when an invalid photo_id is entered', function (done) {
        flickr.searchByID('1', function (err, searchResults) {
            expect(err.stat).toBe('fail')
            expect(err.code).toBe(1)
            expect(err.message).toContain('invalid ID')
            done()
        })
    })
    it('should check the search was successful', function (done) {
        flickr.searchByID('24824103133', function (err, searchResults) {
            expect(err).toBe(null)
            expect(searchResults.requestStatus).toBe('ok')
            done()
        })
    })
    it('should contain the owners name', function (done) {
        flickr.searchByID('24824103133', function (err, searchResults) {
            expect(err).toBe(null)
            expect(searchResults.ownerName).toBe('Alex McCaffrey')
            done()
        })
    })
})
