const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
  profilePhotos: {
    type: String,
    default: 'no-photo.jpg',
  },
  username: {
    type: String,
    required: true,
    max: 20,
    unique: true,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  gender: {
    type: String,
  },
  bio: {
    type: String,
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
})

module.exports = mongoose.model('Profile', ProfileSchema)
