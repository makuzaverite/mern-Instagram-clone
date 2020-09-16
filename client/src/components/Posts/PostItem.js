import React, { useContext, useState } from 'react'
import axios from 'axios'
import { post_types } from '../../actionsTypes/post_types'
import { PostContext } from '../../context/PostContext'
import { AuthContext } from '../../context/AuthContext'
import Avatar from '../../assets/images/avatar.png'
import Spinner from '../layout/Spinner'
import LikeIcon from '../../assets/icons/like.svg'
import LikedIcon from '../../assets/icons/liked.svg'
import CommentIcon from '../../assets/icons/comments.svg'
import SaveIcon from '../../assets/icons/save.svg'
import './PostItem.css'
import { motion } from 'framer-motion'
import PostItemHeader from './PostItemHeader'
import PostDetailsModal from '../modals/PostDetailsModal'
import AddComment from '../Posts/AddComment'

function PostItem(props) {
	const { state } = useContext(AuthContext)
	const { postDispatch } = useContext(PostContext)
	const { postPhoto, username, user, _id, likes, comments, caption } = props.post
	const token = localStorage.getItem('auth-token')

	const [ispostDetailsOpen, setIsPostDetailsOpen] = useState(false)

	function HasLiked() {
		return likes.some((like) => like.user === state.user._id)
	}

	const handleLike = async () => {
		try {
			const res = await axios.post(`/api/post/like/${_id}`, null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			postDispatch({ type: post_types.ADD_LIKE, payload: res.data.data })
		} catch (error) {
			if (error.response.data.error === 'User already likes this post') {
				handleUnlike()
			}
		}
	}

	const handleUnlike = async () => {
		try {
			const res = await axios.post(`/api/post/unlike/${_id}`, null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			postDispatch({ type: post_types.UN_LIKE, payload: res.data.data })
		} catch (error) {
			if (error.response.data.error === 'You have not liked this post') handleLike()
		}
	}

	const LikeIconButton = HasLiked() ? LikedIcon : LikeIcon

	return !user ? (
		<Spinner />
	) : (
		<>
			<PostDetailsModal
				post={props.post}
				isopen={ispostDetailsOpen}
				onClose={() => setIsPostDetailsOpen(false)}
			/>
			<motion.section
				className='postItem'
				initial={{ opacity: 1 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 3 }}>
				<PostItemHeader avatar={Avatar} user={user} post_id={_id} username={username} />
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
						{comments.map(
							(comm, index) =>
								index < 3 && (
									<div key={comm._id}>
										<p>
											<strong>{comm.names}</strong> {comm.text}
										</p>
									</div>
								)
						)}
					</div>
					<AddComment postId={_id} />
				</div>
			</motion.section>
		</>
	)
}

export default PostItem
