import React from 'react'
import './CommentListItem.css'

function commentListItem({ comments, limit }) {
	return comments.length === 0 ? (
		<div className='no_comment'>
			<p>Not comments added yet</p>
			<p>You may add one</p>
		</div>
	) : (
		<p>comments are listed here</p>
	)
}

export default commentListItem
