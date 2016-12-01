'use strict'
const schema = require('../schema/schema')
exports.savePhoto = photoDetails => new Promise((resolve, reject) => {
    if (!'id' in photoDetails && !'title' in photoDetails) reject(new Error('invalid photo object'))
    const photo = new schema.Book(photoDetails)
    movie.save((err, book) => {
        if (err) reject(new Error('error when saving photo'))
        resolve(book)
    })
})
exports.addUser = details => new Promise((resolve, reject) => {
    if (!'username' in details && !'password' in details) reject(new Error('invalid user object'))
    const user = new schema.User(details)
    user.save((err, user) => {
        if (err) reject(new Error('error creating account'))
        delete details.password
        resolve()
    })
})
exports.userExists = account => new Promise((resolve, reject) => {
    schema.User.find({
        username: account.username
    }, (err, docs) => {
        if (docs.length) reject(new Error('This username is already taken'))
        resolve()
    })
})
exports.checkCredentials = credentials => new Promise((resolve, reject) => {
    schema.User.find({
        username: credentials.username
    }, (err, docs) => {
        if (err) reject(new Error('db error'))
        if (docs.length) resolve(docs)
        reject(new Error('invalid username'))
    })
})