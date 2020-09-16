import React from 'react'
import './CommentListItem.css'

function commentListItem({ comments }) {
	return comments.length === 0 ? (
		<div className='no_comment'>
			<p>Not comments added yet</p>
			<p>You may add one</p>
		</div>
	) : (
		<div className='commentsWrapper'>
			{comments.map((comm) => (
				<p key={comm._id}>
					<strong>{comm.names}</strong> {comm.text}
				</p>
			))}
		</div>
	)
}

export default commentListItem
