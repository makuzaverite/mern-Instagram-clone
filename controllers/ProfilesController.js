const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Profile = require('../models/profileModel')
const path = require('path')

exports.createprofile = asyncHandler(async (req, res, next) => {
	const user = req.user._id

	if (!user) return next(new ErrorResponse(`No user found with id ${req.user._id}`, 400))

	const { username, website, location, bio, gender } = req.body

	if (!username) return next(new ErrorResponse('username is missing', 400))

	const checkUsername = await Profile.findOne({ username })
	const checkuser = await Profile.findOne({ user })

	if (checkuser) {
		const fieldsToupdate = {
			user,
			username,
			website,
			location,
			bio,
			gender,
		}
		const updatedProfile = await Profile.findByIdAndDelete(req.user.id, fieldsToupdate, {
			new: true,
			runValidators: true,
		})

		res.status(201).json({
			success: true,
			data: updatedProfile,
		})
		return
	}

	if (checkUsername) return next(new ErrorResponse('Invalid username', 400))

	const newProfile = await Profile.create({
		user,
		username,
		website,
		location,
		gender,
		bio,
	})

	res.status(200).json({
		success: true,
		data: newProfile,
	})
})

exports.getProfiles = asyncHandler(async (req, res) => {
	const profile = await Profile.find()
	res.status(200).json({ success: true, data: profile })
})

exports.getProfile = asyncHandler(async (req, res) => {
	let profile = await Profile.findOne({ user: req.user._id })

	res.status(200).json({ success: true, profile })
})

exports.findProfile = asyncHandler(async (req, res, next) => {
	const { username } = req.params

	if (!username) return next(new ErrorResponse('no username id passed', 400))

	const profile = await Profile.findOne({ username: username })

	if (!profile) return next(new ErrorResponse('NOT FOUND', 400))
	res.status(200).json({ success: true, data: profile })
})

exports.updateProfile = asyncHandler(async (req, res) => {
	const checkProfile = await Profile.findById(req.params.id)

	if (!checkProfile) {
		return next(new ErrorResponse('No profile found', 400))
	}

	const fieldsToupdate = {
		user: req.user.id,
		username: req.body.username,
		website: req.body.website,
		location: req.body.location,
		gender: req.body.gender,
		bio: req.body.bio,
	}
	const user = await Profile.findByIdAndUpdate(req.params.id, fieldsToupdate, {
		runValidators: true,
		new: true,
	})
	res.status(201).json({ success: true, data: user })
})

exports.follow = asyncHandler(async (req, res, next) => {
	const existantance = await Profile.findOne({ _id: req.params.profileId })

	if (existantance.user === req.user._id) {
		return next(new ErrorResponse('Permission denied', 400))
	}

	if (
		existantance.followers.filter((follower) => follower.user.toString() === req.user.id)
			.length > 0
	) {
		return next(new ErrorResponse('User follows this person', 403))
	}

	existantance.followers.unshift({ user: req.user.id })

	await existantance.save()

	res.status(200).json({ success: true, data: existantance })
})

exports.unfollow = asyncHandler(async (req, res, next) => {
	const existantance = await Profile.findOne({ _id: req.params.profileId })

	if (existantance.user === req.user._id) {
		return next(new ErrorResponse('Permission denied', 400))
	}

	if (
		existantance.followers.filter((follower) => follower.user.toString() === req.user.id)
			.length === 0
	) {
		return next(new ErrorResponse(`You don't follow this person`, 403))
	}

	const followIndex = existantance.followers.map((follower) => follower.user.toString())

	existantance.followers.splice(followIndex, 1)

	await existantance.save()

	res.status(200).json({ success: true, data: existantance })
	res.status(200).json({ success: true, data: {} })
})

exports.updateProfilePicture = asyncHandler(async (req, res, next) => {
	const profile = await Profile.findById(req.params.id)

	if (!profile) {
		return next(new ErrorResponse(`No profile found`, 403))
	}

	if (!req.files) return next(new ErrorResponse(`Please upload a file`, 400))

	const file = req.files.file

	//Make sure file is a photo
	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse(`Please upload an image file`, 400))
	}

	if (file.size > process.env.FILE_UPLOAD_SIZE) {
		return next(
			new ErrorResponse(
				`Please upload an image less than ${process.env.FILE_UPLOAD_SIZE}`,
				400
			)
		)
	}

	//create custom filenane
	file.name = `photo_${profile._id}${path.parse(file.name).ext}`

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			return next(new ErrorResponse(`Problem occured while uploading file`, 500))
		}

		await Profile.findByIdAndUpdate(req.params.id, { profilePhotos: file.name })
		res.status(200).json({
			success: true,
			data: file.name,
		})
	})
})
