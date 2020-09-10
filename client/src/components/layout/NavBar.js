import React, { useContext, useState } from 'react'
import './NavBar.css'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ProfileContext } from '../../context/ProfileContext'
import Avatar from '../../assets/images/avatar.png'
import HomeIcon from '../../assets/icons/home.svg'
import ShareIcon from '../../assets/icons/share.svg'
import ExploreIcon from '../../assets/icons/explore.svg'
import LikeIcon from '../../assets/icons/like.svg'
import AddPostIcon from '../../assets/icons/add_box.svg'
import { auth_actions } from '../../actions/action_types'
import { profile_types } from '../../actions/profile_types'
import AddNewPost from '../modals/AddNewPost'

export default function NavBar() {
	const { state, dispatch } = useContext(AuthContext)
	const { profileState, profileDispatch } = useContext(ProfileContext)
	const [isOpen, setisOpen] = useState(false)

	const history = useHistory()
	const logout = () => {
		localStorage.setItem('auth-token', '')
		dispatch({ type: auth_actions.LOGOUT })
		profileDispatch({ type: profile_types.LOGOUT })
		history.push('/login')
	}

	if (state.isLoading) {
		return null
	} else {
		return (
			<nav>
				<span>
					<Link to='/' className='app_name'>
						iDrip
					</Link>
				</span>
				{state.user ? (
					<ul>
						<li>
							<Link to='/'>
								<img
									src={HomeIcon}
									alt='Avatar'
									align='center'
									tooltip='profile'
									height='100px'
								/>
							</Link>
						</li>

						<li>
							<Link to='/'>
								<img
									src={ShareIcon}
									alt='Avatar'
									align='center'
									tooltip='profile'
									height='100px'
								/>
							</Link>
						</li>
						<li>
							<AddNewPost isopen={isOpen} onClose={() => setisOpen(false)} />
							<Link to='/' onClick={() => setisOpen(true)}>
								<img
									src={AddPostIcon}
									alt='Avatar'
									align='center'
									tooltip='profile'
									height='100px'
								/>
							</Link>
						</li>

						<li>
							<Link to='/'>
								<img
									src={ExploreIcon}
									alt='Avatar'
									align='center'
									tooltip='profile'
									height='100px'
								/>
							</Link>
						</li>

						<li>
							<Link to='/'>
								<img
									src={LikeIcon}
									alt='Avatar'
									align='center'
									tooltip='profile'
									height='100px'
								/>
							</Link>
						</li>
						<li>
							<Link to={`/${profileState.username}`}>
								<img src={Avatar} alt='Avatar' align='center' tooltip='profile' />
							</Link>
						</li>
						<li onClick={logout} style={{ cursor: 'pointer' }}>
							Logout
						</li>
					</ul>
				) : (
					<ul>
						<li>
							<Link to='/login'>Login</Link>
						</li>
						<li>
							<Link to='/register'>Register</Link>
						</li>
					</ul>
				)}
			</nav>
		)
	}
}
