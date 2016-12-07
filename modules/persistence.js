'use strict'
const schema = require('../schema/schema')
const index = require('../index')
exports.userExists = function (req, res, next) {
    schema.userModel.find({
        username: this.username
    }, function (err, users) {
        //    if (users.hasOwnProperty('username')) return (new Error('username already exists'))
        if (!users.length) next()
        else {
            console.log('user exists: ', this.username)
            next(new Error("User exists!"))
        }
        //    next()
    })
}
exports.addUser = function (req, res, next) {
    const user = new schema.userModel()
    user.username = req.params.username
    user.password = req.params.password
    user.save(function (err) {
        if (err) index.failure(res, next, 'User not saved', 500)
        index.success(res, next, user)
    })
}
exports.showUsers = function (err, callback) {
    schema.userModel.find({}, function (err, users) {
        if (err) return ('error could not find any users')
        return callback(null, users)
    })
}
exports.addToFavourites = function (req, res, next) {
    const photo = new schema.photoModel()
    photo.photoID = req.params.photoID
    photo.save(function (err) {
        if (err) index.failure(res, next, 'Photo not saved', 500)
        index.success(res, next, photo)
    })
}
exports.showFavourites = function (err, callback) {
    schema.photoModel.find({}, function (err, favourites) {
        if (err) return ('error could not find photos')
        return callback(null, favourites)
    })
}
exports.deleteFavourite = function (photoID, callback) {
    console.log('removing photo')
    schema.photoModel.remove({
        photoID: photoID
    }, function (err, photo) {
        if (err) throw err
        return callback(null, photo)
    })
}
