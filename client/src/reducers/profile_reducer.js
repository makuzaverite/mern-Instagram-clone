import { profile_types } from '../actions/profile_types'

export const ProfileReducer = (state, action) => {
  switch (action.type) {
    case profile_types.GET_PROFILE:
      return {
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
    default:
      return state
  }
}
