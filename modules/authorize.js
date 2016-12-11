'use strict'
const bcrypt = require('bcryptjs')
const persistence = require('./persistence')

exports.hashPassword = (password) => new Promise((resolve, reject) => {
    if (password === undefined) reject(new Error('Missing password'))
    const salt = bcrypt.genSaltSync(10)
    password = bcrypt.hashSync(password, salt)
    resolve(password)
})

//nigel
exports.authorise = request => new Promise( (resolve, reject) => {
    getUserPass(request).then( reqCredentials => {
        this.reqCreds = reqCredentials
        return db.getUser(reqCredentials.username)
    }).then( user => checkPassword(this.reqCreds.password, user.password)
 ).then( () => resolve()
 ).catch( err => reject(err.message === 'User not found.' ? new Error('Basic Authentication failed') : err))
})

//alex
exports.authorize = (username, password) => new Promise((resolve, reject) => {
    module.getPass(username, password).then(credentials => {
        this.credentials = credentials
        return persistence.getUser(credentials.username)
    }).then(user => checkPassword(this.credentials.password, user.password))
    .then(() => resolve()
    ).catch(err => reject(err.message === 'User not found.' ? new Error('Basic Authentication failed') : err))
})


//mark
//
//exports.getHeaderCredentials = request => new Promise((resolve, reject) => {
//    if (request.authorization === undefined || request.authorization.basic === undefined) {
//        reject(new Error('authorization header missing'))
//    }
//    const auth = request.authorization.basic
//    if (auth.username === undefined || auth.password === undefined) {
//        reject(new Error('missing username / password'))
//    }
//    resolve({
//        username: auth.username
//        , password: auth.password
//    })
//})

module.getPass = (provided, stored) => new Promise((resolve, reject) => {
    console.log('aa')
    if (!bcrypt.compareSync(provided, stored)) {
        reject(new Error('invalid password'))
        console.log('rejected')
    }
    resolve()
})
