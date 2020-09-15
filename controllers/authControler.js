const ErrorResponse = require('../utils/errorResponse')
const asynHandler = require('../middleware/async')
const User = require('../models/UserModel')
const Profile = require('../models/profileModel')

exports.register = asynHandler(async (req, res, next) => {
	const { firstname, lastname, email, password, username } = req.body

	const user = await User.create({
		firstname,
		lastname,
		email,
		password,
	})

	await Profile.create({
		username,
		user: user._id,
	})

	sendTokenResponse(user, 200, res)
})

exports.login = asynHandler(async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		return next(new ErrorResponse(`Please provide an email and provide`, 400))
	}

	console.log(email, password)

	//check for the user
	const user = await User.findOne({ email }).select('+password')

	if (!user) {
		return next(new ErrorResponse(`Invalid credintails`, 401))
	}

	const isMatch = await user.matchPassword(password)

	if (!isMatch) {
		return next(new ErrorResponse(`Invalid credintails`, 401))
	}
	sendTokenResponse(user, 200, res)
})

const sendTokenResponse = (user, statusCode, res) => {
	const token = user.getSignedJwtToken()

	res.status(statusCode).json({
		sucess: true,
		token: token,
	})
}

exports.getMe = asynHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id)
	res.status(200).json({
		sucess: true,
		data: user,
	})
})

exports.updateDetails = asynHandler(async (req, res, next) => {
	const filedsToUpdate = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
	}
	const user = await User.findByIdAndUpdate(req.user.id, filedsToUpdate, {
		new: true,
		runValidators: true,
	})

	res.status(200).json({
		sucess: true,
		data: user,
	})
})

exports.updatepassword = asynHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password')

	const { currentPassword, newPassword } = req.body

	if (!currentPassword || !newPassword) {
		return next(new ErrorResponse('Please insert in all fields'))
	}

	//check current password
	if (!(await user.matchPassword(currentPassword))) {
		return next(new ErrorResponse(`Password is incorrect`, 401))
	}

	user.password = newPassword
	await user.save()

	sendTokenResponse(user, 200, res)
})
