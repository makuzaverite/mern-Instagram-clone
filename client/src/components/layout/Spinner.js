import React from 'react'
import spinnerimage from '../../assets/images/Spinner.gif'

function Spinner() {
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<img src={spinnerimage} alt='Spinner' style={{ width: '50%' }} />
		</div>
	)
}

export default Spinner
