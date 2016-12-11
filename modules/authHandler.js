'use strict'
const authorize = require('./authorize')
const status = {
	ok: 200
    , added: 201
    , badRequest: 400
}

exports.authorizeALEX = (req, res, next) => {
	const username = req.body.username
	const password = req.body.password

	authorize.authorize(password, (err) => {
		err ? res.send(status.badRequest, err) : next()
	})
}

exports.authorize = (req, res, next) => {
	const username = req.authorization.basic.username
	const password = req.authorization.basic.password

	authorize.authorize(username, password)
    .then(username => next())
    .catch(err => res.send(status.badRequest, err))
}

//exports.authorise = (req, res, next) => {
// auth.authorise(req).then( () => next()
// ).catch(err => res.send(unauthorised, err))
//}
