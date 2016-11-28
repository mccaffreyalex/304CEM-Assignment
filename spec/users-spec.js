'use strict'
const user = require('../modules/users')
describe('The add user function', function () {
        it('confirm the user has been added, but not confirmed', function (done) {
            user.validateUser('alex', , function (err, searchResults) {
                expect(err).toBe(null)
                expect(searchResults.photo.id).toBe('24824103133')
                done()
            })
        })
    })
    ///check user is added
    ///check user is not added
    ///check user is confirmed
    ///check user is not confirmed
    ///check user deleted
    ///check user not deleted