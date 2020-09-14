import React, { useContext } from 'react'
import './ProfileSnack.css'
import avatar from '../../assets/images/avatar.png'
import { AuthContext } from '../../context/AuthContext'
import { ProfileContext } from '../../context/ProfileContext'
import { Link } from 'react-router-dom'

function ProfileSnack() {
	const { state } = useContext(AuthContext)
	const { profileState } = useContext(ProfileContext)

	return (
		<div className='snackBar'>
			<img src={avatar} alt='avatar' />
			<div>
				<Link to={`/${profileState.username}`} className='snackProfileName'>
					{profileState.username}
				</Link>
				<p className='userFullname'>
					{state.user.firstname} {state.user.lastname}
				</p>
			</div>
		</div>
	)
}

export default ProfileSnack
