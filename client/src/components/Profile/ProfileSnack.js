import React, { useContext } from 'react'
import './ProfileSnack.css'
import avatar from '../../assets/images/avatar.png'
import { AuthContext } from '../../context/AuthContext'
import { ProfileContext } from '../../context/ProfileContext'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'

function ProfileSnack() {
	const { state } = useContext(AuthContext)
	const { profileState } = useContext(ProfileContext)
	const { user } = state

	return !state.user ? (
		<Spinner />
	) : (
		<div className='snackBar'>
			<img src={ profileState.profilePhotos ? profileState.profilePhotos : avatar} alt='avatar' />
			<div>
				<Link to={`/${profileState.username}`} className='snackProfileName'>
					{profileState.username}
				</Link>
				<p className='userFullname'>
					{user.firstname} {user.lastname}
				</p>
			</div>
		</div>
	)
}

export default ProfileSnack
