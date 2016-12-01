'use strict'
const db = require('./persistence')
const api = require('./data-api')
exports.searchByTag = (request, callback) => {
    api.extractParam(request, 't').then(tag => {
        return api.searchByTag(tag)
    }).then(searchResults => {
        this.results = searchResults
        return api.searchByID(searchResults.photo_id)
    }).then(data => {
        this.data = data
        return api.searchWeather(request.params.t, data.dateTaken)
    }).then(weather => {
        return api.combinedData(this.results, this.data, weather)
    }).then(data => {
        callback(null, data)
    }).catch(err => {
        callback(err)
    })
}
exports.addUser = (request, callback) => {
    let data
    console.log(1)
    db.checkCredentials(request).then(account => {
        console.log(2)
        this.account = account
    }).then(account => {
        console.log(3)
        db.userExists(account)
    }).then(account => {
        console.log(4)
        callback(null, account)
    }).catch(err => {
        callback(err)
    })
}
exports.showUsers = (request, callback) => {
    api.extractParam(request, '').then(() => {
        return api.showUsers(request).then
    }).then(data => {
        callback(null, data)
    }).catch(err => {
        callback(err)
    })
}
