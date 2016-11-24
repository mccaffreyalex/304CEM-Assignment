'use strict'
const flickrInfo = require('../modules/flickr-info-request')
describe('The Flickr-Info API', function () {
        xit('confirm it has searched for the correct image', function (done) {
            flickrInfo.flickrInfo('24824103133', function (err, searchResults) {
                expect(err).toBe(null)
                expect(searchResults.photo.id).toBe('24824103133')
                done()
            })
        })
        xit('should return error when no photo_id is entered', function (done) {
            flickrInfo.flickrInfo('', function (err, searchResults) {
                expect(searchResults.stat).toBe('fail')
                expect(searchResults.code).toBe(1)
                expect(searchResults.message).toContain('not found')
                done()
            })
        })
        xit('should return error when an invalid photo_id is entered', function (done) {
            flickrInfo.flickrInfo('1', function (err, searchResults) {
                expect(searchResults.stat).toBe('fail')
                expect(searchResults.code).toBe(1)
                expect(searchResults.message).toContain('invalid ID')
                done()
            })
        })
        xit('should check the search was successful', function (done) {
            flickrInfo.flickrInfo('24824103133', function (err, searchResults) {
                expect(err).toBe(null)
                expect(searchResults.stat).toBe('ok')
                done()
            })
        })
        xit('should contain the owners name', function (done) {
            flickrInfo.flickrInfo('24824103133', function (err, searchResults) {
                expect(err).toBe(null)
                expect(searchResults.photo.owner.realname).toBe('Alex McCaffrey')
                done()
            })
        })
    })
    // id = 24824103133