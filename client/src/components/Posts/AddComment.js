import React, { useContext, useState } from 'react'
import './AddComment.css'
import { post_types } from '../../actionsTypes/post_types'
import { PostContext } from '../../context/PostContext'
import axios from 'axios'

function AddComment({ postId }) {
	const { postDispatch } = useContext(PostContext)

	const [comment, setComment] = useState('')

	const handleComment = async (e) => {
		e.preventDefault()
		if (comment.length === 0) {
			alert('Please add a comment')
			return
		}
		let token = await localStorage.getItem('auth-token')

		try {
			const res = await axios.post(
				`/api/post/comment/${postId}`,
				{ text: comment },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			setComment('')
			postDispatch({ type: post_types.ADD_COMMENT, payload: res.data.data })
		} catch (error) {
			console.log(error.response.data.error)
		}
	}

	return (
		<div className='add_comment'>
			<form onSubmit={handleComment}>
				<input
					type='text'
					placeholder='comment here'
					className='comment_input'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<input type='submit' value='Post' className='submit_comment' />
			</form>
		</div>
	)
}

export default AddComment
