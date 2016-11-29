'use strict'
//import mongoose
const mongoose = require('mongoose')
const credentials = {
    user: 'alexmccaffrey'
    , pass: 'p5ssword'
}
mongoose.connect(`mongodb://${credentials.user}:${credentials.pass}@ds113958.mlab.com:13958/apidb`)
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
    //create a schema
const userScheme = new Schema({
        name: String
        , username: String
        , password: String
    })
    //create a model using the schema
exports.User = mongoose.model('User', userScheme)
    //create a schema 
const bookSchema = new Schema({
        account: String
        , title: String
        , authors: String
        , bookID: String
    })
    // create a model using the schema
exports.Book = mongoose.model('Book', bookSchema)