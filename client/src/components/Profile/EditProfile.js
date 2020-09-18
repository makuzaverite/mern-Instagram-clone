import React, { useContext, createRef, useState } from 'react'
import Spinner from '../layout/Spinner'
import './EditProfile.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { ProfileContext } from '../../context/ProfileContext'
import { profile_types } from '../../actionsTypes/profile_types'

function EditProfile() {
	const history = useHistory()
	const { profileState, profileDispatch } = useContext(ProfileContext)

	const website = createRef()
	const bio = createRef()
	const location = createRef()
	const username = createRef()
	const token = localStorage.getItem('auth-token')
	const [gender, setGender] = useState(profileState.gender)

	const profileID = profileState.id

	const handleEdit = async (e) => {
		e.preventDefault()

		const profile = {
			username: username.current.value,
			website: website.current.value,
			bio: bio.current.value,
			gender: gender,
			location: location.current.value,
		}

		try {
			console.log(profileID)

			const res = await axios.put('/api/profile/' + profileID, profile, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})

			profileDispatch({
				type: profile_types.EDIT_PROFILE,
				payload: res.data.data,
			})

			history.push('/' + profileState.username)
		} catch (error) {
			console.log(error.response.message)
		}
	}

	return Object.keys(profileState).length === 0 && profileState.constructor === Object ? (
		<Spinner />
	) : (
		<div className='edit-profile'>
			<form onSubmit={handleEdit}>
				<div className='form-control'>
					<input type='hidden' id='profilePic' />
				</div>

				<div className='form-control'>
					<label htmlFor='username'>Username</label>
					<input
						defaultValue={profileState.username}
						type='text'
						id='username'
						ref={username}
						placeholder='Username'
						required
					/>
				</div>
				<div className='form-control'>
					<label htmlFor='bio'>Biography</label>
					<textarea
						defaultValue={profileState.bio}
						id='bio'
						ref={bio}
						placeholder='Bio'
					/>
				</div>

				<div className='form-radio-group'>
					<label htmlFor='gender'>Gender</label>
					<input
						defaultChecked={profileState.gender === 'Male'}
						type='radio'
						id='gender'
						name='gender'
						value='Male'
						onChange={(e) => setGender(e.target.value)}
					/>
					{'   '}
					Male <br />
					<input
						defaultChecked={profileState.gender === 'Female'}
						type='radio'
						id='gender'
						value='Female'
						name='gender'
						onChange={(e) => setGender(e.target.value)}
					/>
					{'  '} Female
				</div>

				<div className='form-control'>
					<label htmlFor='website'>Website</label>
					<input
						defaultValue={profileState.website}
						type='url'
						id='website'
						ref={website}
						placeholder='website'
					/>
				</div>
				<div className='form-control'>
					<label htmlFor='location'>Location</label>
					<input
						defaultValue={profileState.location}
						type='text'
						id='location'
						ref={location}
						placeholder='location'
					/>
				</div>
				<button type='submit'>Edit Profile</button>
			</form>
		</div>
	)
}

export default EditProfile
