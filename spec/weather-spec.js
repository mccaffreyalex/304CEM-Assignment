/*global require describe it xit expect */
'use strict'
const weather = require('../modules/weather')
describe('The Apixu Weather API', function () {
    it('should check that the request was successful', function (done) {
        const location = 'London'
        const date = '2016-11-07'
        weather.weatherSearch(location, date, function(err, searchresults){
            expect(searchresults.location.name).toBe(location)
            expect(searchresults.forecast.forecastday[0].date).toBe(date)
        })
    })
})