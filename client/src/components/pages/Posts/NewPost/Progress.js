import React from 'react'
import { motion } from 'framer-motion'

export default function Progress({ progress }) {
	return (
		<motion.div
			style={{ height: '5px', backgroundColor: '#b2003d', marginTop: '20px' }}
			initial={{ width: 0 }}
			animate={{ width: progress + '%', transition: { delay: 1 } }}></motion.div>
	)
}
