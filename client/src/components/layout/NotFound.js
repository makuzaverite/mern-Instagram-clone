import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
	return (
		<div
			style={{
				height: '80vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily: 'Poppins',
			}}>
			<h1>
				user not found back to <Link to='/'>Home</Link>
			</h1>
		</div>
	)
}
