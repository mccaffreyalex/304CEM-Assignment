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
    const user = new schema.userModel(user)
    user.username = details.username
    user.password = details.password
    user.save((err, user) => {
        if (err) reject(new Error('error creating account'))
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
exports.showUsers = function (err, callback) {
    schema.User.find({}, function (err, users) {
        if (err) return ('error could not find any users')
        return callback(null, users)
    })
}
exports.showFavourites = function (err, callback) {
    schema.Photo.find({}, function (err, favourites) {
        if (err) return ('error could not find photos')
        return callback(null, favourites)
    })
}
