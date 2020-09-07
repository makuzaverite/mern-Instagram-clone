import React, { useContext } from 'react'
import axios from 'axios'
import { post_types } from '../../../../actions/post_types'
import { PostContext } from '../../../../context/PostContext'
import { AuthContext } from '../../../../context/AuthContext'
import Avatar from '../../../../assets/images/avatar.png'
import PostSampleImage from '../../../../assets/images/post_sample.jpeg'
import Spinner from '../../../layout/Spinner'
import { Link } from 'react-router-dom'
import './PostItem.css'

function PostItem(props) {
	const { state } = useContext(AuthContext)
	const { postDispatch } = useContext(PostContext)
	const { date, postPhoto, username, user, _id, likes, comments } = props.post
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

	return !user ? (
		<Spinner />
	) : (
		// <div className='post-section'>
		// 	<div className='post-ownership'>
		// 		<img src={Avatar} alt='userPhoto' className='userPhoto' />
		// 		<span>
		// 			<Link to={`/profile/${username}`}>{username}</Link>
		// 		</span>
		// 		<span>{new Date(date).toLocaleDateString()}</span>
		// 	</div>
		// 	<img className='post-image' src={postPhoto} alt={'name'} />
		// 	<div className='reaction'>
		// 		{findUser() && found ? (
		// 			<i className='fa fa-heart' onClick={handleLike} style={{ color: 'red' }}>
		// 				{likes.length}{' '}
		// 			</i>
		// 		) : (
		// 			<i className='fa fa-heart-o' onClick={handleLike}>
		// 				{likes.length > 0 ? likes.length : null}
		// 			</i>
		// 		)}
		// 		<Link to={`/post/${_id}`}>
		// 			<i className='fa fa-comment-o'>
		// 				{comments.length > 0 ? comments.length : null}
		// 			</i>
		// 		</Link>
		// 		{creator === user ? <i className='fa fa-trash' onClick={handleDelePost}></i> : null}
		// 	</div>
		// </div>
		<section className='postItem'>
			<div className='post_header'>
				<img src={Avatar} alt='user_profile_avatar' />
				<div>
					<h3>...</h3>{' '}
				</div>
			</div>
			<div className='post_body'>
				<img src={PostSampleImage} alt='post_image' />
			</div>
			<div className='post_footer'>
				<div className='post_footer_icons'>
					<p>icons</p>
					<p>icons</p>
					<p>icons</p>
				</div>
				<div className='likes_count'>12 likes</div>
				<div className='first 2 comments'>
					<p>first comment</p>
					<p>second comment</p>
				</div>
				<div>Comment form</div>
			</div>
		</section>
	)
}

export default PostItem
