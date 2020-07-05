import React, { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { ProfileReducer } from '../reducers/profile_reducer'
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
  const [state, dispatch] = useReducer(ProfileReducer, initialState)

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
          dispatch({
            type: profile_types.GET_PROFILE,
            payload: prof.data.data,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    currentLoggedIn()
  }, [])

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider
