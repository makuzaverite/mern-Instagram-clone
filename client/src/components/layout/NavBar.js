import React, { useContext, useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Avatar from '../../assets/images/avatar.png'
import HomeIcon from '../../assets/icons/home.svg'
import ExploreIcon from '../../assets/icons/explore.svg'
import LikeIcon from '../../assets/icons/like.svg'
import AddPostIcon from '../../assets/icons/add_box.svg'
import AddNewPost from '../modals/AddNewPost'
import ProfileAvatarDropDown from '../modals/ProfileAvatarDropDown'
import Spinner from './Spinner'
import { ProfileContext } from '../../context/ProfileContext'

export default function NavBar() {
	const { state } = useContext(AuthContext)
	const {profileState} = useContext(ProfileContext)
	const [isOpen, setisOpen] = useState(false)
	const [openDropDown, setOpenDropDown] = useState(false)



	if (state.isLoading) return <Spinner />
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
						<Link
							to='#'
							onClick={() => setOpenDropDown((openDropDown) => !openDropDown)}>
							<img src={profileState.profilePhotos ? profileState.profilePhotos : Avatar} alt='Avatar' style={{borderRadius:'50%'}} align='center' tooltip='profile' />
						</Link>
					</li>
					<ProfileAvatarDropDown
						onClose={() => setOpenDropDown(false)}
						isOpen={openDropDown}
					/>
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
