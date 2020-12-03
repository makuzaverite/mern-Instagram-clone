const express = require('express')
const {
  register,
  login,
  getMe,
  updateDetails,
  updatepassword,
} = require('../controllers/authControler')
const { protect } = require('../middleware/auth')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.put('/updateDetails', protect, updateDetails)
router.put('/updatePassword', protect, updatepassword)

module.exports = router
