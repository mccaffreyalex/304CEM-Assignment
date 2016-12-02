'use strict'
const api = require('../modules/model')
describe('My API', function () {
        xit('should check the request was successful', function (done) {
            api.searchByTag('London', function (err, searchResults) {
                console.log(searchResults)
                expect(err).toBe(null)
            })
        })
    })
    //it('should check that the request was successful', function (done) {
    //    const date = '2016-12-01'
    //    const location = 'London'
    //    weather.searchWeather(location, date, function (err, searchResults) {
    //        expect(err).toBe(null)
    //        expect(searchResults.location).toBe(location)
    //        expect(searchResults.date).toBe(date)
    //        done()
    //    })
    //})