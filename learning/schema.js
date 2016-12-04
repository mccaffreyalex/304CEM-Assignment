'use strict'
const mongoose = require('mongoose')
const credentials = {
    user: 'alex'
    , pass: 'alex'
}
mongoose.connect(`mongodb://${credentials.user}:${credentials.pass}@ds113958.mlab.com:13958/304db`)
const Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId
const UserSchema = new Schema({
    username: String
    , password: String
})
exports.userModel = mongoose.model('users', UserSchema)
