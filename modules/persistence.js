'use strict'
const schema = require('../schema/schema')
exports.savePhoto = bookDetails => new Promise((resolve, reject) => {
    if (!'title' in bookDetails && !'authors' in bookDetails && !'description' in bookDetails) {
        reject(new Error('invalid photo object'))
    }
    const photo = new schema.Book(bookDetails)
    book.save((err, book) => {
        if (err) {
            reject(new Error('error when saving book'))
        }
        resolve(book)
    })
})
exports.addUser = details => new Promise((resolve, reject) => {
    if (!'username' in details && !'password' in details && !'name' in details) {
        reject(new Error('invalid user object'))
    }
    const user = new schema.User(details)
    user.save((err, user) => {
        if (err) {
            reject(new Error('error creating account'))
        }
        delete details.password
        resolve()
    })
})