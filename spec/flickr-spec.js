/// spec/flickr-spec.js
'use strict'
const flickrSearch = require('../modules/flickr')
const jasmie = require('jasmine')
const tag = 'London'
const getFlickrData = require('../server')
describe('Searching Location', function () {
    it('should put the location into the Flickr API URL', function () {
        const location = getFlickrData(tag);
        expect(location).toBe('London');
    });
});

describe('Searching 2 photos per page', function () {
    it('should display 2 photos', function () {
        const location = getFlickrData(tag);
        expect(JSON.photos.perpage).toBe(2);
    });
});
