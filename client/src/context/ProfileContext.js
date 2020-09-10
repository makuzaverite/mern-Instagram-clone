import React, { createContext, useReducer, useEffect, useContext } from 'react'
import { ProfileReducer } from '../reducers/profile_reducer'
import { AuthContext } from './AuthContext'
import axios from 'axios'
import { profile_types } from '../actions/profile_types'

const initialState = {
	followers: [],
	gender: '',
	location: '',
	profilePhotos: '',
	username: '',
	website: '',
	bio: '',
	user: '',
	id: '',
}

export const ProfileContext = createContext(null)

const ProfileContextProvider = (props) => {
	const [profileState, profileDispatch] = useReducer(ProfileReducer, initialState)

	const { state } = useContext(AuthContext)

	useEffect(() => {
		const getMe = async () => {
			if (state.token) {
				try {
					const prof = await axios.get('/api/profile/me', {
						headers: {
							Authorization: state.token,
						},
					})

					const { profile } = prof.data

					profileDispatch({ payload: profile, type: profile_types.SET_PROFILE })
				} catch (error) {
					console.log(error)
				}
			}
		}
		getMe()
	}, [state, profileDispatch])

	return (
		<ProfileContext.Provider value={{ profileState, profileDispatch }}>
			{props.children}
		</ProfileContext.Provider>
	)
}

export default ProfileContextProvider
