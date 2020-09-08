import React from 'react'
import './ProfileSnack.css'
import avatar from '../../assets/images/avatar.png'

function ProfileSnack() {
	return (
		<div className='snackBar'>
			<img src={avatar} alt='avatar' />
			<h5>First and last Name</h5>
		</div>
	)
}

export default ProfileSnack
