import React from 'react'

function authError({ error }) {
	return (
		<p
			style={{
				color: 'red',
				textAlign: 'center',
				padding: '5px 0',
				fontSize: '15px',
			}}>
			{error}
		</p>
	)
}

export default authError
