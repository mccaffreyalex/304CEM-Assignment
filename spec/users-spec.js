'use strict'
const persistence = require('../modules/persistence')
const schema = require('../schema//schema')
describe('Users', () => {
    beforeEach(done => {
        schema.userModel.remove({}, err => {
            if (err) expect(true).toBe(false)
            new schema.userModel({
                username: 'alex'
                , password: 'p5ssword'
            }).save((err, userModel) => {
                if (err) expect(true).toBe(false)
                schema.userModel.count({}, (err, count) => {
                    if (err) expect(true).toBe(false)
                    expect(count).toBe(1)
                    done()
                })
            })
        })
    })
})
describe('add', () => {
        it('should add a user', done => {
            const user = {
                username: 'alex'
                , password: 'p5ssword'
            }
            persistence.addUser.add(user, (err, data) => {
                if (err) expect(true).toBe(false)
                schema.userModel.count({}, (err, count) => {
                    if (err) expect(true).toBe(false)
                    expect(count).toBe(2)
                    done()
                })
            })
        })
    })
    ///check user is added
    ///check user is not added
    ///check user is confirmed
    ///check user is not confirmed
    ///check user deleted
    ///check user not deleted
