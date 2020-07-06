const express = require('express')
const {
  createprofile,
  getProfiles,
  getProfile,
  updateProfile,
  follow,
  unfollow,
  updateProfilePicture,
  findProfile,
} = require('../controllers/ProfilesController')
const router = express.Router({ mergeParams: true })

const { protect } = require('../middleware/auth')

router.get('/', getProfiles)
router.get('/me', protect, getProfile)
router.get('/:id', findProfile)
router.post('/', protect, createprofile)
router.put('/:id', protect, updateProfile)
router.put('/photo/:id', protect, updateProfilePicture)
router.post('/follow/:profileId', protect, follow)
router.post('/unfollow/:profileId', protect, unfollow)
module.exports = router
