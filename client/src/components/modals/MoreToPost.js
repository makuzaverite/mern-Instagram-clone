import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactDOM from 'react-dom'
import './MoreToPost.css'

export default function MoreToPost({ isOpen, onClose }) {
	const backdrop = {
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
			y: 200,
			opacity: 1,
		},
		leave: {
			y: 200,
			opacity: 0,
		},
	}

	if (!isOpen) return null

	return ReactDOM.createPortal(
		<>
			<AnimatePresence>
				<motion.div
					className='backDrop'
					variants={backdrop}
					initial='hidden'
					animate='visible'
					exit='hidden'
					onClick={onClose}>
					<motion.div className='modal' variants={modalVariants} exit='leave'>
						<div style={{ marginBottom: '30px' }}>
							<button onClick={onClose} className='closeModal'>
								X
							</button>
						</div>

						<ul className='postList'>
							<li>Share this post</li>
							<li>Delete this post</li>
							<li>Report</li>
							<li>unfollow this person</li>
						</ul>
					</motion.div>
				</motion.div>
			</AnimatePresence>
		</>,
		document.getElementById('portal')
	)
}
