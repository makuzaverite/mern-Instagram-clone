import React from 'react'

function commentListItem({ comments }) {
	return comments.length === 0 ? <p>Not comments added yet</p> : <p>comments are listed here</p>
}

export default commentListItem
