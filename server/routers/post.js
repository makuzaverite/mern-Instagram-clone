const express = require('express')
const {
	createpost,
	getPosts,
	getPost,
	deletePost,
	likePost,
	unlikePost,
	addComment,
	editComment,
	deleteComment,
	getpostsBy,
} = require('../controllers/PostController')
const router = express.Router()
const { protect } = require('../middleware/auth')

router.post('/', protect, createpost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/user/:username', getpostsBy)
router.delete('/:id', protect, deletePost)
router.post('/like/:id', protect, likePost)
router.post('/unlike/:id', protect, unlikePost)
router.post('/comment/:id', protect, addComment)
router.put('/comment/:postId/:commentId', protect, editComment)
router.delete('/comment/:postId/:commentId', protect, deleteComment)
module.exports = router
