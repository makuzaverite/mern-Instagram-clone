import React, { useContext } from 'react'
import axios from 'axios'
import { post_types } from '../../../../actions/post_types'
import { PostContext } from '../../../../context/PostContext'
import { AuthContext } from '../../../../context/AuthContext'
import Avatar from '../../../../assets/images/avatar.png'
import Spinner from '../../../layout/Spinner'
import LikeIcon from '../../../../assets/icons/like.svg'
import LikedIcon from '../../../../assets/icons/liked.svg'
import CommentIcon from '../../../../assets/icons/comments.svg'
import ShareIcon from '../../../../assets/icons/share.svg'
import SaveIcon from '../../../../assets/icons/save.svg'
import { Link } from 'react-router-dom'
import './PostItem.css'
import { motion } from 'framer-motion'

function PostItem(props) {
	const { state } = useContext(AuthContext)
	const { postDispatch } = useContext(PostContext)
	const { date, postPhoto, username, user, _id, likes, comments, caption } = props.post
	const creator = props.creator
	const token = localStorage.getItem('auth-token')

	let found = true

	const findUser = () => {
		if (likes.filter((like) => like.user === state.user._id).length > 0) {
			return true
		}
		return false
	}

	const handleDelePost = async () => {
		await axios.delete(`/api/post/${_id}`, {
			headers: {
				Authorization: token,
			},
		})

		postDispatch({ type: post_types.DELETE_POST, payload: _id })
	}

	const handleLike = async () => {
		try {
			const res = await axios.post(`/api/post/like/${_id}`, null, {
				headers: {
					Authorization: token,
				},
			})
			if (res.data.data) {
				found = true
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
				found = false
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

	const likeIcon = !findUser() ? LikeIcon : LikedIcon

	return !user ? (
		<Spinner />
	) : (
		<section className='postItem'>
			<div className='post_header'>
				<div className='post_header_user'>
					<img src={Avatar} alt='user_profile_avatar' />
					<Link to='#'>{username}</Link>
				</div>
				<div>
					<h3>...</h3>{' '}
				</div>
			</div>
			<div className='post_body'>
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
							src={likeIcon}
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
					<p>
						{likes.length > 0 && (
							<div>
								<h1>
									{likes.length === 1
										? `${likes.length} Like`
										: `${likes.length} Likes`}
								</h1>
							</div>
						)}
					</p>
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
				{/* <div>
					<p>form here</p>
				</div> */}
			</div>
		</section>
	)
}

export default PostItem
