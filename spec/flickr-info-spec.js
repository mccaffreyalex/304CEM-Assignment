'use strict'
const flickrInfo = require('../modules/flickr-info-request')
describe('The Flickr-Info API', function () {
        it('confirm it has searched for the correct image', function (done) {
            flickrInfo.flickrInfo('24824103133', function (err, searchResults) {
                expect(err).toBe(null)
                expect(searchResults.photo.id).toBe('24824103133')
                done()
            })
        })
        xit('should search for image with incorrect id', function (done) {
            flickrInfo.flickrInfo('', function (err, searchResults) {
                expect(searchResults.stat).toBe('fail')
                expect(searchResults.code).toBe('96')
                expect(searchResults.message).toContain('Invalid')
                done()
            })
        })
        it('should check the search was successful', function (done) {
            flickrInfo.flickrInfo('24824103133', function (err, searchResults) {
                expect(err).toBe(null)
                expect(searchResults.stat).toBe('ok')
                done()
            })
        })
        it('should contain the owners name', function (done) {
            flickrInfo.flickrInfo('24824103133', function (err, searchResults) {
                expect(err).toBe(null)
                expect(searchResults.photo.owner.realname).toBe('Alex McCaffrey')
                done()
            })
        })
    })
    // id = 24824103133
