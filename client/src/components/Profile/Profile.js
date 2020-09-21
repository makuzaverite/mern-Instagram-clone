import React, { useContext, useEffect, useState } from 'react'
import Avatar from '../../assets/images/avatar.png'
import settingsIcon from '../../assets/icons/settings.svg'
import axios from 'axios'
import './Profile.css'
import Spinner from '../layout/Spinner'
import { Link, Redirect } from 'react-router-dom'
import ProfilePostList from './ProfilePostList'
import { AuthContext } from '../../context/AuthContext'

const Profile = ({ match }) => {
	const [profilePhoto, setProfilePhoto] = useState('')
	const [Username, setUsername] = useState('')
	const [biography, setBiography] = useState('')
	const [gender, setGender] = useState('')
	const [website, setWebsite] = useState('')
	const [userId, setUserId] = useState('')
	const [error, setError] = useState(false)
	const [posts, setPosts] = useState([])
	const [followers, setFollowers] = useState([])
	const { state } = useContext(AuthContext)

	const { username } = match.params

	useEffect(() => {
		const checkUserProfile = async () => {
			try {
				const prof = await axios.get(`/api/profile/` + username)
				if (prof.data.data) {
					setUserId(prof.data.data.user)
					setProfilePhoto(prof.data.data.profilePhotos)
					setUsername(prof.data.data.username)
					setGender(prof.data.data.gender)
					setFollowers(prof.data.data.followers)
					setBiography(prof.data.data.bio)
					setWebsite(prof.data.data.website)
				}
			} catch (error) {
				setError(true)
			}
		}

		const getPosts = async () => {
			try {
				const response = await axios.get('/api/post/user/' + username)
				const { posts } = response.data
				setPosts(posts)
			} catch (error) {
				console.log(error)
			}
		}

		checkUserProfile()
		getPosts()
	}, [setProfilePhoto, setUsername, setPosts, username])

	let isWhoLoggedIn = false

	if (state.user) {
		isWhoLoggedIn = state.user._id === userId
	}

	return error ? (
		<Redirect to='/notfound' />
	) : !Username ? (
		<Spinner />
	) : (
		<section className='profile-page'>
			<div className='profiler__card'>
				<div className='profile_avatar'>
					<img src={profilePhoto === 'no-photo.jpg' ? Avatar : profilePhoto } alt='profile' />
				</div>

				<div className='intro_to_user'>
					<div className='follow'>
						<h3>{Username}</h3>

						{!isWhoLoggedIn ? (
							<>
								<button className='follow_btn'>Follow</button>
								<button className='more_btn'>
									<i className='fas fa-sort-down'></i>
								</button>
							</>
						) : (
							<>
								<div className='editProfileBtn'>
									<Link to='/edit/profile' className='editProfile'>
										Edit Profile
									</Link>
								</div>

								<div className='settings'>
									<img src={settingsIcon} alt='edit_profile' />
								</div>
							</>
						)}
					</div>

					<div className='posts_summary'>
						<p>
							<strong>{posts.length}</strong> {posts.length > 0 ? 'Posts' : 'Post'}
						</p>
						<p>
							<strong>{followers.length}</strong>{' '}
							{followers.length > 0 ? 'Followers' : 'Followers'}
						</p>
						<p>
							<strong>14050</strong> Following
						</p>
					</div>

					<div className='fullinfo'>
						<h4>Makuza Verite</h4>
						<p>{biography}</p>
						<p>{gender}</p>
					</div>
					<div className='website'>
						<a href='http://www.makuza.com' target='_blank' rel='noopener noreferrer'>
							{website}
						</a>
					</div>
				</div>
			</div>

			<div className='profilePostGallery'>
				<div className='tabs'>
					<p>
						<i className='far fa-list-alt'></i> Posts
					</p>
					<p>
						<i className='fas fa-tv'></i>
						IGTV
					</p>
					<p>
						<i className='fas fa-user-tag'></i>
						Tags
					</p>
					<p>
						<i className='far fa-bookmark'></i>
						Saved
					</p>
				</div>

				<div className='postWrapper'>
					{posts.length > 0 ? (
						posts.map((post) => <ProfilePostList key={post._id} post={post} />)
					) : (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
								textAlign: 'center',
							}}>
							<h4 style={{ textAlign: 'center' }}>No post found</h4>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default Profile
