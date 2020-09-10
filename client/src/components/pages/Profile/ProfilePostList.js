import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PostDetailsModal from '../../modals/PostDetailsModal'

export default function ProfilePostList({ post }) {
	const [isPostsDetailsOpen, setPostsDetailsOpen] = useState(false)

	return (
		<div>
			<motion.div layout whileHover={{ opacity: 1 }}>
				<PostDetailsModal
					post={post}
					isopen={isPostsDetailsOpen}
					onClose={() => setPostsDetailsOpen(false)}
				/>
				<motion.img
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 3 }}
					src={post.postPhoto}
					onClick={() => setPostsDetailsOpen(true)}
				/>
			</motion.div>
		</div>
	)
}
