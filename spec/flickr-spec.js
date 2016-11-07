/// spec/flickr-spec.js
'use strict'
const flickrSearch = require('../modules/flickr')
const jasmine = require('jasmine')
const getFlickrData = require('../server')
const request = require('request')
const base_url = 'http://localhost:8081/'
/*describe('Searching Location', function () {
    it('should put the location into the Flickr API URL', function () {
        const tag = 'London'
        const location = getFlickrData(tag);
        expect(location).toBe('London');
    });
});
describe('Searching 2 photos per page', function () {
    it('should display 2 photos', function () {
        const location = getFlickrData(tag);
        expect(JSON.photos.perpage).toBe(2);
    });
});*/
describe("Testing Server is running", function () {
    describe("GET /", function () {
        it("returns status code 200", function () {
            request.get(base_url, function (error, response, body) {
                expect(response.statusCode).toBe(200)
                expect(true).toEqual(true)
                done()
            });
        });
    });
});
///tests
///when searching for london, the url contains tags="london"
///when searching, 2 photos will be returned = per_page=2
///when searching, and no photos show up - undefinded
///

