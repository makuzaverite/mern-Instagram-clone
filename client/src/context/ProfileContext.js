import React, { createContext, useReducer } from 'react'
import { ProfileReducer } from '../reducers/profile_reducer'

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
  const [profileState, profileDispatch] = useReducer(
    ProfileReducer,
    initialState
  )
  return (
    <ProfileContext.Provider value={{ profileState, profileDispatch }}>
      {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider
