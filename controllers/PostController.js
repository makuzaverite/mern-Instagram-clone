const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Post = require('../models/PostModel')
const Profile = require('../models/profileModel')
const router = require('../routers/post')
const { post } = require('../routers/post')
const path = require('path')
const mongoose = require('mongoose')

//get posts
exports.getPosts = asyncHandler(async (req, res, next) => {
	const posts = await Post.find().sort({ date: -1 })
	res.status(200).json({ success: true, data: posts })
})

//get post
exports.getPost = asyncHandler(async (req, res, next) => {
	const post = await Post.findById(req.params.id).sort({ date: -1 })
	res.status(200).json({ success: true, data: post })
})

//Create new post
exports.createpost = asyncHandler(async (req, res, next) => {
	const profile = await Profile.findOne({ user: req.user.id })

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
	file.name = `post_${new Date().getUTCMilliseconds() + 1000}_${req.user.id}${
		path.parse(file.name).ext
	}`

	file.mv(`${process.env.POST_FILE_PATH}/${file.name}`, async (err) => {
		if (err) {
			return next(new ErrorResponse(`Problem occured while uploading file`, 500))
		}

		const url = req.protocol + '://' + req.get('host')
		const newPost = new Post({
			user: req.user.id,
			postPhoto: `${url}/public/${file.name}`,
			username: profile.username,
			caption: req.body.caption,
		})

		await newPost.save()

		res.status(200).json({
			success: true,
			data: newPost,
		})
	})
})

//route to delete a post
exports.deletePost = asyncHandler(async (req, res, next) => {
	await Post.findByIdAndDelete(req.params.id)
	res.status(200).json({ success: true, data: {} })
})

//route to like a post
exports.likePost = asyncHandler(async (req, res, next) => {
	const checkPostavailable = await Post.findById(req.params.id)
	if (!checkPostavailable) {
		return next(new ErrorResponse('Post doesnot exists', 400))
	}

	if (
		checkPostavailable.likes.filter((like) => like.user.toString() === req.user.id).length > 0
	) {
		return next(new ErrorResponse('User already likes this post', 400))
	}

	checkPostavailable.likes.unshift({ user: req.user.id })

	await checkPostavailable.save()

	res.status(200).json({ success: true, data: checkPostavailable })
})

//route to unlike a post
exports.unlikePost = asyncHandler(async (req, res, next) => {
	const checkPostavailable = await Post.findById(req.params.id)

	// console.log(checkPostavailable.user.toString() === req.user._id.toString())

	// if (checkPostavailable.user.toString() !== req.user._id.toString())
	//   return next(new ErrorResponse('Not allowed to perform this', 400))

	if (!checkPostavailable) return next(new ErrorResponse('Post doesnot exists', 400))

	if (
		checkPostavailable.likes.filter((like) => like.user.toString() === req.user.id).length === 0
	) {
		return next(new ErrorResponse('You have not liked this post', 400))
	}

	//Get remove index
	const removeIndex = checkPostavailable.likes
		.map((item) => item.user.toString)
		.indexOf(req.user.id)

	checkPostavailable.likes.splice(removeIndex, 1)
	await checkPostavailable.save()
	res.status(200).json({ success: true, data: checkPostavailable })
})

//route to comment a posts
exports.addComment = asyncHandler(async (req, res, next) => {
	const checkPostavailable = await Post.findById(req.params.id)

	if (!checkPostavailable) {
		return next(new ErrorResponse('Post doesnot exists', 400))
	}

	if (!req.body.text) {
		return next(new ErrorResponse('Comment should not be null', 400))
	}

	const newPost = {
		user: req.user.id,
		text: req.body.text,
		names: req.user.firstname + ' ' + req.user.lastname,
	}

	checkPostavailable.comments.unshift(newPost)

	await checkPostavailable.save()

	res.status(200).json({ success: true, data: checkPostavailable })
})
//route to edit comment a post
exports.editComment = asyncHandler(async (req, res, next) => {
	const checkPostavailable = await Post.findById(req.params.postId)

	if (!checkPostavailable) {
		return next(new ErrorResponse('Post doesnot exists', 400))
	}

	if (
		checkPostavailable.comments.filter(
			(comment) => comment._id.toString() === req.params.commentId
		).length === 0
	) {
		return next(new ErrorResponse('Comment you are looking for does not exist', 400))
	}

	const editIndex = checkPostavailable.comments
		.map((comment) => comment._id.toString())
		.indexOf(req.params.commentId)

	const newPost = {
		user: req.user.id,
		text: req.body.text,
		names: req.user.firstname + ' ' + req.user.lastname,
	}

	if (checkPostavailable.comments[editIndex].user === req.user.id) {
		new ErrorResponse('You cant edit a post you dont own', 400)
	}
	checkPostavailable.comments[editIndex] = newPost

	await checkPostavailable.save()

	res.status(200).json({ success: true, data: checkPostavailable })
})
//route to delete a comment
exports.deleteComment = asyncHandler(async (req, res, next) => {
	const checkPostavailable = await Post.findById(req.params.postId)

	if (!checkPostavailable) {
		return next(new ErrorResponse('Post doesnot exists', 400))
	}

	if (
		checkPostavailable.comments.filter(
			(comment) => comment._id.toString() === req.params.commentId
		).length === 0
	) {
		return next(new ErrorResponse('Comment you are looking for does not exist', 400))
	}

	const editIndex = checkPostavailable.comments
		.map((comment) => comment._id.toString())
		.indexOf(req.params.commentId)

	if (checkPostavailable.comments[editIndex].user === req.user.id) {
		new ErrorResponse('You cant delete a post you dont own', 400)
	}

	let remmainingComment = checkPostavailable.comments.filter(
		(comment) => comment._id.toString() !== req.params.commentId
	)

	checkPostavailable.comments = remmainingComment
	await checkPostavailable.save()

	res.status(200).json({ success: true, data: checkPostavailable })
})
