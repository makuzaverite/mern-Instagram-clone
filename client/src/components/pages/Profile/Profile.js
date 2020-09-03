import React, { useContext, useEffect, useCallback } from 'react'
import Avatar from './avatar.png'
import axios from 'axios'
import './Profile.css'
import { ProfileContext } from '../../../context/ProfileContext'
import Spinner from '../../layout/Spinner'
import { useHistory, Link } from 'react-router-dom'
import { profile_types } from '../../../actions/profile_types'

const Profile = () => {
	const { profileState, profileDispatch } = useContext(ProfileContext)

	const changeProfile = useCallback(profileDispatch, [profileState])

	useEffect(() => {
		const currentLoggedIn = async () => {
			const token = await localStorage.getItem('auth-token')
			try {
				const prof = await axios.get(`/api/profile/me`, {
					headers: {
						Authorization: token,
					},
				})

				if (prof.data.data) {
					changeProfile({
						type: profile_types.SET_PROFILE,
						payload: prof.data.data,
					})
				}
			} catch (error) {
				console.log(error)
			}
		}
		currentLoggedIn()
	}, [changeProfile])

	const history = useHistory()

	const handleEdit = () => history.push('/profile/edit')

	return Object.keys(profileState).length === 0 && profileState.constructor === Object ? (
		<Spinner />
	) : (
		// <div className="profile-page">
		//   <section className="profile">
		//     <div className="profile-avatar" style={{ margin: 'auto' }}>
		//       <img src={Avatar} alt="avatar" align="center" />
		//     </div>
		//     <div className="profile-details">
		//       {profileState.username ? (
		//         <p>
		//           username:{' '}
		//           <span style={{ fontWeight: 'bold' }}>
		//             {profileState.username}
		//           </span>
		//         </p>
		//       ) : null}

		//       {profileState.bio ? (
		//         <p>
		//           Bio:{' '}
		//           <span style={{ fontWeight: 'bold' }}>{profileState.bio}</span>{' '}
		//         </p>
		//       ) : null}

		//       {profileState.gender ? (
		//         <p>
		//           Gender:{' '}
		//           <span style={{ fontWeight: 'bold' }}>{profileState.gender}</span>
		//         </p>
		//       ) : null}
		//       {profileState.website ? (
		//         <p>
		//           Website:{' '}
		//           <a href={profileState.website}>{profileState.website} </a>
		//         </p>
		//       ) : null}

		//       {profileState.location ? (
		//         <p>
		//           Location:{' '}
		//           <span style={{ fontWeight: 'bold' }}>
		//             {profileState.location}
		//           </span>
		//         </p>
		//       ) : null}

		//       <button onClick={handleEdit} className="edit-btn">
		//         Edit Profile
		//       </button>
		//     </div>
		//   </section>
		// </div>

		<section className='profile-page'>
			<div className='profiler__card'>
				<div className='profile_avatar'>
					<img src={Avatar} alt='profile' />
				</div>

				<div className='intro_to_user'>
					<div className='follow'>
						<h3>username</h3>
						<button className='follow_btn'>Follow</button>
						<button className='more_btn'>More</button>
					</div>

					<div className='posts_summary'>
						<p>
							<strong>14050</strong> Posts
						</p>
						<p>
							<strong>14050</strong> Followers
						</p>
						<p>
							<strong>14050</strong> Following
						</p>
					</div>

					<div className='fullinfo'>
						<h3>Makuza Verite</h3>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
							laboriosam!
						</p>
					</div>
					<div className='website'>
						<a target='_blank' href='www.makuza.com'>
							www.makuza.com
						</a>
					</div>
				</div>
			</div>

			<div className='profilePostGallery'></div>
		</section>
	)
}

export default Profile
