'use strict'
const mongoose = require('mongoose')

const credentials = {
	user: 'alex'
    , pass: 'alex'
}

mongoose.connect(`mongodb://${credentials.user}:${credentials.pass}@ds113958.mlab.com:13958/304db`)

mongoose.Promise = global.Promise

const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: String
    , password: String
})

exports.userModel = mongoose.model('users', UserSchema)

const photoSchema = new Schema({
	photoID: String,
	location: String
})

exports.photoModel = mongoose.model('Photo', photoSchema)
