import React from 'react'
import './AddComment.css'

function AddComment() {
	function handleSubmit(e) {
		e.preventDefault()
	}

	return (
		<div className='add_comment'>
			<form onSubmit={handleSubmit}>
				<input type='text' placeholder='comment here' className='comment_input' />
				<input type='submit' value='Post' className='submit_comment' />
			</form>
		</div>
	)
}

export default AddComment
