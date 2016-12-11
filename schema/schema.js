'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const credentials = {
    user: 'alex'
    , pass: 'alex'
}

mongoose.connect(`mongodb://${credentials.user}:${credentials.pass}@ds113958.mlab.com:13958/304db`)

mongoose.Promise = global.Promise

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String
    , password: String
})

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9))
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

exports.userModel = mongoose.model('users', userSchema)

const photoSchema = new Schema({
    username: String,
    photoID: String,
    location: String
})

exports.photoModel = mongoose.model('Photo', photoSchema)

    // using this to close the mongoose connection when running code coverage.
process.on('SIGINT', function() {
    mongoose.disconnect(function() {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})
