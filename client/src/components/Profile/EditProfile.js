import React, { useContext, createRef, useState } from 'react'
import Spinner from '../layout/Spinner'
import './EditProfile.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { ProfileContext } from '../../context/ProfileContext'
import { profile_types } from '../../actionsTypes/profile_types'
import AvatarIcon from '../../assets/images/avatar.png'

function EditProfile() {
	const history = useHistory()
	const { profileState, profileDispatch } = useContext(ProfileContext)
	const uploadedImage = createRef(null)
	const imageUploader = createRef(null)
	const website = createRef()
	const bio = createRef()
	const location = createRef()
	const username = createRef()
	const token = localStorage.getItem('auth-token')
	const [gender, setGender] = useState(profileState.gender)



	const profileID = profileState.id


	const handleChangeImage = async(e) => {
		const file = e.target.files[0]

		const formData = new FormData()
		formData.append('file', file)

		if (file) {
			Object.assign(file, {
				preview: URL.createObjectURL(file),
			})
			uploadedImage.current.src = file.preview

			try {
				const response = await axios.put('/api/profile/photo/'+profileID, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				})
				profileDispatch({
					type:profile_types.EDIT_PROFILE_IMAGE,
                    payload:response.data.data
				})
			} catch (error) {
				console.log(error)
			}

		}
	}

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

	return !profileState.username ? (
		<Spinner />
	) : (
		<div className='edit-profile'>
			<form onSubmit={handleEdit}>
				<div
					style={{
						display: 'flex',
						flexFlow: 'column nowrap',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<input
						type='file'
						accept='image/*'
						multiple={false}
						src={AvatarIcon}
						onChange={handleChangeImage}
						ref={imageUploader}
						style={{
							display: 'none',
						}}
					/>
					<div
						style={{
							width: '70px',
							height: '70px',
						}}
						onClick={() => imageUploader.current.click()}>
						<img
							ref={uploadedImage}
							src={AvatarIcon && profileState.profilePhotos}
							alt='image_upload'
							style={{
								height: '80px',
								width: '80px',
								position: 'absolute',
								borderRadius: '50%',
							}}
						/>
					</div>
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
					{'   '} Male <br />
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
