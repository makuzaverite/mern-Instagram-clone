import React, { useState } from 'react'
import MoreToPost from '../modals/MoreToPost'
import { Link } from 'react-router-dom'
import './PostItem.css'

function PostItemHeader({ avatar, post_id, user, username }) {
	const [isMoreModalOpen, setisMoreModalOpen] = useState(false)

	return (
		<div className='post_header'>
			<div className='post_header_user'>
				<img src={avatar} alt='user_profile_avatar' />
				<Link to={`/${username}`}>{username}</Link>
			</div>

			<MoreToPost
				isOpen={isMoreModalOpen}
				user={user}
				post_id={post_id}
				onClose={() => setisMoreModalOpen(false)}
			/>

			<div>
				<h3 onClick={() => setisMoreModalOpen(true)}>...</h3>
			</div>
		</div>
	)
}

export default PostItemHeader
