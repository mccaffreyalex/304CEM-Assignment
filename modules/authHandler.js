'use strict'
const authorize = require('./authorize')
const status = {
    ok: 200
    , added: 201
    , badRequest: 400
}
exports.authorize = (req, res, next) => {
    authorize.authorize(req.authorization.basic.username, req.authorization.basic.password, (err, user) => {
    err ? res.send(err, status.badRequest) : res.send(status.ok, user)
    next()
    })
}
