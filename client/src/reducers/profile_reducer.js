import { profile_types } from '../actionsTypes/profile_types'

export const ProfileReducer = (state, action) => {
	switch (action.type) {
		case profile_types.SET_PROFILE:
			return {
				...state,
				id: action.payload._id,
				followers: action.payload.followers,
				gender: action.payload.gender,
				location: action.payload.location,
				profilePhotos: action.payload.profilePhotos,
				username: action.payload.username,
				website: action.payload.website,
				bio: action.payload.bio,
				user: action.payload.user,
			}
		case profile_types.EDIT_PROFILE:
			return {
				...state,
				followers: action.payload.followers,
				gender: action.payload.gender,
				location: action.payload.location,
				profilePhotos: action.payload.profilePhotos,
				username: action.payload.username,
				website: action.payload.website,
				bio: action.payload.bio,
				user: action.payload.user,
				id: action.payload._id,
			}

		case profile_types.EDIT_PROFILE_IMAGE:
			return {
				...state,
				profilePhotos:action.payload
			}
		case profile_types.LOGOUT:
			return {}
		default:
			return state
	}
}
