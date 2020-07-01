const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'The first name is required'],
  },
  lastname: {
    type: String,
    required: [true, 'The last name is required'],
  },
  email: {
    type: String,
    required: [true, 'The email address is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid emial ',
    ],
  },
  password: {
    type: 'string',
    required: [true, 'password is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

//Hashing password before saving user in db
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

//Sign in user and generate token to him/her
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SCRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Match user entered password to hashed ones in the db
UserSchema.methods.matchPassword = async function (enteredpassword) {
  return bcrypt.compare(enteredpassword, this.password)
}

UserSchema.pre('remove', async function (next) {
  console.log(`Profiles being removed from are those with id ${this._id}`)
  await this.model('Profile').deleteMany({ user: this._id })
  next()
})

module.exports = mongoose.model('User', UserSchema)
