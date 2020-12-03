const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/UserModel')

exports.getUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find().sort('-createdAt')
  res.status(200).json({ success: true, data: user })
})

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  res.status(200).json({ success: true, data: user })
})

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body)
  res.status(201).json({ success: true, data: user })
})

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: user,
  })
})

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new Error('User not found', 400))
  }

  await user.remove()

  res.status(200).json({ success: true, data: user })
})
