import React, { useContext, useState } from 'react'
import axios from 'axios'
import { post_types } from '../../../../actionsTypes/post_types'
import { PostContext } from '../../../../context/PostContext'
import { AuthContext } from '../../../../context/AuthContext'
import Avatar from '../../../../assets/images/avatar.png'
import Spinner from '../../../layout/Spinner'
import LikeIcon from '../../../../assets/icons/like.svg'
import LikedIcon from '../../../../assets/icons/liked.svg'
import CommentIcon from '../../../../assets/icons/comments.svg'
import SaveIcon from '../../../../assets/icons/save.svg'
import './PostItem.css'
import { motion } from 'framer-motion'
import PostItemHeader from './PostItemHeader'
import PostDetailsModal from '../../../modals/PostDetailsModal'
import AddComment from '../../../Posts/AddComment'

function PostItem(props) {
	const { state } = useContext(AuthContext)
	const { postDispatch } = useContext(PostContext)
	const { postPhoto, username, user, _id, likes, comments, caption } = props.post
	const token = localStorage.getItem('auth-token')

	const [ispostDetailsOpen, setIsPostDetailsOpen] = useState(false)

	const findUser = () => {
		if (likes.filter((like) => like.user === state.user._id).length > 0) {
			return true
		}
		return false
	}

	// const handleDelePost = async () => {
	// 	await axios.delete(`/api/post/${_id}`, {
	// 		headers: {
	// 			Authorization: token,
	// 		},
	// 	})

	// 	postDispatch({ type: post_types.DELETE_POST, payload: _id })
	// }

	const handleLike = async () => {
		try {
			const res = await axios.post(`/api/post/like/${_id}`, null, {
				headers: {
					Authorization: token,
				},
			})
			if (res.data.data) {
				postDispatch({ type: post_types.ADD_LIKE, payload: res.data.data })
			}
		} catch (error) {
			if (error.response.data.error === 'User already likes this post') {
				handleUnlike(_id)
			}
			return
		}
	}

	const handleUnlike = async (id) => {
		try {
			const res = await axios.post(`/api/post/unlike/${id}`, null, {
				headers: {
					Authorization: token,
				},
			})
			if (res.data.data) {
				postDispatch({ type: post_types.UN_LIKE, payload: res.data.data })
				return
			}
			handleUnlike(id)
			return
		} catch (error) {
			if (error.response.data.error === 'You have not liked this post') return
			console.log(error.response.data.error)
		}
	}

	const LikeIconButton = !findUser() ? LikeIcon : LikedIcon

	return !user ? (
		<Spinner />
	) : (
		<>
			<PostDetailsModal
				post={props.post}
				isopen={ispostDetailsOpen}
				onClose={() => setIsPostDetailsOpen(false)}
			/>
			<section className='postItem'>
				<PostItemHeader avatar={Avatar} username={username} />
				<div className='post_body' onClick={() => setIsPostDetailsOpen(true)}>
					<img src={postPhoto} alt='post_image' />
				</div>
				<div className='post_footer'>
					<div className='post_footer_icons'>
						<div>
							<motion.img
								whileHover={{
									scale: 1.2,
									transition: { duration: 1 },
									cursor: 'pointer',
								}}
								src={LikeIconButton}
								alt='like_icon'
								onClick={handleLike}
							/>
							<img src={CommentIcon} alt='comment_icon' />
						</div>
						<div>
							<img src={SaveIcon} alt='bookmar' />
						</div>
					</div>
					<div className='likes_count'>
						<div>
							{likes.length > 0 && (
								<div>
									<h1>
										{likes.length === 1
											? `${likes.length} Like`
											: `${likes.length} Likes`}
									</h1>
								</div>
							)}
						</div>
					</div>

					<div className='caption'>
						<p className='caption_user'>
							<strong>{username}</strong>
						</p>
						<p>{caption}</p>
					</div>
					<div className='Pickedcomments'>
						{comments.map((comm) => (
							<div key={comm._id}>
								<p>{comm.names}</p>
								<p>{comm.text}</p>
							</div>
						))}
					</div>
					<AddComment />
					{/* <div>
					<p>form here</p>
				</div> */}
				</div>
			</section>
		</>
	)
}

export default PostItem
