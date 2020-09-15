const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	postPhoto: {
		type: String,
		require: true,
	},
	username: {
		type: String,
		required: true,
	},
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		},
	],
	caption: {
		type: String,
	},
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
			text: {
				type: String,
				require: true,
			},
			names: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('Post', PostSchema)
