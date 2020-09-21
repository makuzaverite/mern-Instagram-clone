import React, { useContext } from 'react'
import ReactDom from 'react-dom'
import { Link, useHistory } from 'react-router-dom'
import { auth_actions } from '../../actionsTypes/action_types'
import { profile_types } from '../../actionsTypes/profile_types'
import { AuthContext } from '../../context/AuthContext'
import { ProfileContext } from '../../context/ProfileContext'
import './ProfileAvatarDropDown.css'
import profileIcon from '../../assets/icons/profile.svg'
import settingsIcon from '../../assets/icons/settings.svg'

function ProfileAvatarDropDown({ isOpen, onClose }) {
	const { profileState, profileDispatch } = useContext(ProfileContext)
	const { dispatch } = useContext(AuthContext)

	const history = useHistory()

	const logout = () => {
		localStorage.setItem('auth-token', '')
		dispatch({ type: auth_actions.LOGOUT })
		profileDispatch({ type: profile_types.LOGOUT })
		history.push('/login')
	}

	if (!isOpen) return null

	return ReactDom.createPortal(
		<>
			<div className='modal-wrapper'>
				<div className='modal-container'>
					<ul>
						<li>
							<Link to={`/${profileState.username}`} onClick={onClose}>
							<img src={profileIcon} alt='profile_icon' />
								Profile
							</Link>
						</li>
						<li>
							<Link to='/edit/profile' onClick={onClose}>
					          <img src={settingsIcon} alt='settings_icon' />
								Settings
							</Link>
						</li>
						<hr />
						<li onClick={logout}>Logout</li>
					</ul>
				</div>
			</div>
		</>,
		document.getElementById('portal')
	)
}

export default ProfileAvatarDropDown
