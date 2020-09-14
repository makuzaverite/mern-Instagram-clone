import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import './PostDetailsModal.css'
import { AuthContext } from '../../context/AuthContext'
import CommentListItem from '../Posts/CommentListItem'
import AddComment from '../Posts/AddComment'

function PostDetailsModal({ post, isopen, onClose }) {
	const { state } = useContext(AuthContext)
	const { caption, likes, comments, date } = post
	const { firstname, lastname } = state.user

	const formattedDate = (date) => {
		const currDate = new Date(date).getDate()
		const currMonth = new Date(date).getMonth()
		const currYear = new Date(date).getFullYear()
		return `${currDate < 10 ? '0' + currDate : currDate}/${
			currMonth < 10 ? '0' + currMonth : currMonth
		}/${currYear}`
	}

	// console.log(post)
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
				className='postDetails'>
				<button onClick={onClose} className='closeButton'>
					X
				</button>
				<motion.div className='postDetailsModal' variants={modalVariants} exit='leave'>
					<motion.img src={post.postPhoto} />
					<motion.div className='postDetailText'>
						<motion.div className='post_details_header'>
							<p>
								{firstname} {lastname}
							</p>
							<p>Posted at {formattedDate(date)}</p>
						</motion.div>

						<CommentListItem comments={comments} />
						<AddComment />
					</motion.div>
				</motion.div>
			</motion.div>
		</>,
		document.getElementById('portal')
	)
}

export default PostDetailsModal
