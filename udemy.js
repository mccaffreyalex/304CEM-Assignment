const users = {}
var max_user_id = 0
const schema = require('./learning/schema')

function respond(res, next, status, data, http_code) {
    const response = {
        'status': status
        , 'data': data
    }
    res.setHeader('content-type', 'application/json')
    res.writeHead(http_code)
    res.end(JSON.stringify(response))
    return next()
}

function success(res, next, data) {
    respond(res, next, 'success', data, 200)
}

function failure(res, next, data, http_code) {
    respond(res, next, 'failure', data, http_code)
}
exports.showUsers = function (req, res, next) {
    success(res, next, users)
}
exports.addUser = function (req, res, next) {
    const user = req.params
    max_user_id++
    user.id = max_user_id
    users[user.id] = user
    success(res, next, user)
}
exports.addUser2 = function (req, res, next) {
    const user = new schema.userModel()
    user.username = req.params.username
    user.password = req.params.password
    user.save(function (err) {
        if (err) failure(res, next, 'User not saved', 500)
        success(res, next, user)
    })
}