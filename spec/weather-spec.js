/*global require describe it xit expect */
'use strict'
const weather = require('../modules/weather')
describe('The Apixu Weather API', function () {
    it('should check that the request was successful', function (done) {
        const location = 'London'
        const date = '2016-11-07'
        weather.weatherSearch(location, date, function (err, searchResults) {
            expect(searchResults.location.name).toBe(location)
            expect(searchResults.forecast.forecastday[0].date).toBe(date)
        })
    })
    it('should return an error if location missing', function (done) {
        const location = ''
        const date = '2016-11-07'
        weather.weatherSearch(location, date, function (err, searchResults) {
            expect(searchResults.error.code).toBe(1003)
            expect(searchResults.error.message).toBe(Parameter q is missing)
        })
    })
    it('should return an error if date missing', function (done) {
        const location = 'London'
        const date = ''
        weather.weatherSearch(location, date, function (err, searchResults) {
            expect(searchResults.error.code).toBe(1007)
            expect(searchResults.error.message).toContain('dt parameter should be in yyyy-MM-dd')
        })
    })
    it('should return status 200 OK to check the API key is valid', function(done){
        const location = 'London'
        const date = '2016-11-07'
        weather.weatherSearch(location, date, function(err, searchResults){
            expect(searchResults.status).toBe(200)
        })
    })
})

//to run type npm test