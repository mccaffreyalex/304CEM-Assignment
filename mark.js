//marks lecture
const list = require('./list')
const schema = require('./schema')
describe('shopping list', () => {
    beforeEach(done => {
        schema.List.remove({}, err => {
            if (err) expect(true).toBe(false)
            new schema.List({
                name: 'colours'
                , list: ['red', 'orange', 'yellow']
            }).save((err, list) => {})
            if (err) expect(true).toBe(false)
            schema.List.count({}, (err, count) => {
                if (err) expect(true).toBe(false)
                expect(count).toBe(1)
                done()
            })
        })
    })
    describe('add', () => {
        it('should add a valid list', done => {
            const shopping = {
                name: 'shopping'
                , list: ['bread', 'butter', 'cheese']
            }
            list.add(shopping, (err, data) => {
                if (err) expect(true).toBe(false)
                expect(count).toBe(2)
                done()
            })
        })
    })
    describe('remove', () => {})
})
code coverage
install instanbul. / node_modules / .bin / istanbul cover. / node_modules / .bin / jasmine lists