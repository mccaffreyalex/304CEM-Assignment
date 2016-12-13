'use strict'
const bcrypt = require('bcryptjs')

/**
*@module Authorize Module
*/

/**
*Hashes user password which is passed back to addUser function
*@param {string} password - password to be hashed
*@throws Will throw error if password is missing from request
*@returns hashed password against the salt
*/
const log_rounds = 10

exports.hashPassword = (password) => new Promise((resolve, reject) => {
	if (password === undefined) reject(new Error('Missing password'))
	const salt = bcrypt.genSaltSync(log_rounds)

	password = bcrypt.hashSync(password, salt)
	resolve(password)
})

