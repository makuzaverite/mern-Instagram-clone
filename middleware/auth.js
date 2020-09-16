const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/UserModel')

exports.protect = asyncHandler(async (req, res, next) => {
	let token
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]
	}

	if (!token) {
		return next(new ErrorResponse('Not authorized to acces this route', 403))
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SCRET)
		req.user = await User.findById(decoded.id)
		if (!req.user) {
			return next(new ErrorResponse('Invalid token', 403))
		}
		next()
	} catch (err) {
		return next(new ErrorResponse('Not authrized to access this route', 401))
	}
})
