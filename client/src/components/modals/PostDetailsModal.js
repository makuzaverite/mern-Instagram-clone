import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import './PostDetailsModal.css'

function PostDetailsModal({ post, isopen, onClose }) {
	const backdropVariants = {
		hidden: {
			opacity: 0,
			transition: { when: 'afterChildren' },
		},
		visible: {
			opacity: 1,
			transition: { when: 'beforeChildren' },
		},
	}

	const modalVariants = {
		hidden: {
			opacity: 0,
			y: -200,
		},
		visible: {
			opacity: 1,
			y: 0,
		},
		leave: {
			y: 200,
			opacity: 0,
		},
	}

	if (!isopen) return null
	return ReactDOM.createPortal(
		<>
			<motion.div
				variants={backdropVariants}
				initial='hidden'
				animate='visible'
				exit='hidden'
				className='postDetails'
				onClick={onClose}>
				<motion.div className='postDetailsModal' variants={modalVariants} exit='leave'>
					<motion.img src={post.postPhoto} />
				</motion.div>
			</motion.div>
		</>,
		document.getElementById('portal')
	)
}

export default PostDetailsModal
