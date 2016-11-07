/// spec/flickr-spec.js
'use strict'
const flickr = require('../modules/flickr')
describe('Number of pages', function () {
            it('should limit the number to 1', function (done) {
                const tag = 'London'
                flickr.flickrSearch(tag, function (err, searchResults) {
                    expect(searchResults.photos.perpage).toBe(2)
                    done()
                });
            });
})


            ///tests
            ///when searching for london, the url contains tags="london"
            ///when searching, 2 photos will be returned = per_page=2
            ///when searching, and no photos show up - undefinded
            ///
