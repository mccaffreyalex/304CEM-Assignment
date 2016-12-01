/*global require describe it xit expect */
'use strict'
const weather = require('../modules/weather')
describe('The Apixu Weather API', function () {
        xit('should check that the request was successful', function (done) {
            weather.searchWeather('London', '2016-11-07', function (err, searchResults) {
                expect(err).toBe(null)
                expect(searchResults.location.name).toBe('London')
                expect(searchResults.forecast.forecastday[0].date).toBe('2016-11-07')
                done()
            })
        })
        xit('should return an error if location missing', function (done) {
            weather.searchWeather('', '2016-11-08', function (err, searchResults) {
                expect(err).toBe(null)
                expect(searchResults.error.code).toBe(1003)
                expect(searchResults.error.message).toBe('Parameter q is missing.')
                done()
            })
        })
        xit('should return an error if date missing', function (done) {
            weather.searchWeather('London', '', function (err, searchResults) {
                expect(err).toBe(null)
                expect(searchResults.error.code).toBe(1007)
                expect(searchResults.error.message).toContain('dt parameter should be in yyyy-MM-dd')
                done()
            })
        })
    })
    //to run type npm test
