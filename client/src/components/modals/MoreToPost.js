import React, { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactDOM from 'react-dom'
import './MoreToPost.css'
import axios from 'axios'
import { post_types } from '../../actionsTypes/post_types'
import { AuthContext } from '../../context/AuthContext'
import { PostContext } from '../../context/PostContext'

export default function MoreToPost({ isOpen, user, post_id, onClose }) {
	const { postDispatch } = useContext(PostContext)
	const { state } = useContext(AuthContext)

	const found = user === state.user._id

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

	const handleDelePost = async () => {
		await axios.delete(`/api/post/${post_id}`, {
			headers: {
				Authorization: `Bearer ${state.token}`,
			},
		})

		postDispatch({ type: post_types.DELETE_POST, payload: post_id })
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
							{found && <li onClick={handleDelePost}>Delete this post</li>}
							<li>Report</li>
							{!found && <li>unfollow this person</li>}
						</ul>
					</motion.div>
				</motion.div>
			</AnimatePresence>
		</>,
		document.getElementById('portal')
	)
}
