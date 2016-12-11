/*global require describe it xit expect */
'use strict'
const weather = require('../modules/weather')
describe('The Apixu Weather API', function () {
    it('should check that the request was successful', function (done) {
        const date = '2016-12-05'
        const location = 'London'
        weather.searchWeather(location, date, function (err, searchResults) {
            expect(err).toBe(null)
            expect(searchResults.location).toBe(location)
            expect(searchResults.date).toBe(date)
            done()
        })
    })
    it('should return an error if location missing', function (done) {
        weather.searchWeather('', '2016-12-01', function (err, searchResults) {
            expect(err.code).toBe(1003)
            expect(err.message).toContain('missing')
            expect(err.stat).toBe('fail')
            done()
        })
    })
    it('should return an error if date missing', function (done) {
        weather.searchWeather('London', '', function (err, searchResults) {
            expect(err.code).toBe(1003)
            expect(err.message).toContain('missing')
            done()
        })
    })
    it('should return an error if date is not within past 30 days', function (done) {
        weather.searchWeather('New York', '2015-02-01', function (err, searchResults) {
            expect(err.stat).toBe('fail')
            expect(err.message).toContain('30 days only')
            done()
        })
    })
    it('should return an error if no matching city is found', function (done) {
        weather.searchWeather('randomcityname', '2016-12-5', function (err, searchResults) {
            expect(err.stat).toBe('fail')
            expect(err.message).toContain('no matching city')
            done()
        })
    })
})
