'use strict'
//import mongoose
const mongoose = require('mongoose')
const credentials = {
    user: 'alex'
    , pass: 'alex'
}
mongoose.connect(`mongodb://${credentials.user}:${credentials.pass}@ds113958.mlab.com:13958/304db`)
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const userScheme = new Schema({
    username: String
    , password: String
})
exports.User = mongoose.model('User', userScheme)
const photoSchema = new Schema({
    title: String
    , title: String
    , authors: String
    , bookID: String
})
exports.Photo = mongoose.model('Photo', photoSchema)