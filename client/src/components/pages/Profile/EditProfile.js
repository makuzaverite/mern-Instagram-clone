import React, { useContext, createRef, useState } from 'react'
import Spinner from '../../layout/Spinner'
import './EditProfile.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { ProfileContext } from '../../../context/ProfileContext'
import { profile_types } from '../../../actions/profile_types'

function EditProfile() {
  const history = useHistory()
  const { state, dispatch } = useContext(ProfileContext)

  const website = createRef()
  const bio = createRef()
  const location = createRef()
  const username = createRef()
  const token = localStorage.getItem('auth-token')
  const [gender, setGender] = useState(state.gender)

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
      const res = await axios.put(`/api/profile/${state.id}`, profile, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })

      dispatch({ type: profile_types.EDIT_PROFILE, payload: res.data.data })

      history.push('/profile')
    } catch (error) {
      console.log(error.response.message)
    }
  }

  return Object.keys(state).length === 0 && state.constructor === Object ? (
    <Spinner />
  ) : (
    <div className="edit-profile">
      <form onSubmit={handleEdit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            defaultValue={state.username}
            type="text"
            id="username"
            ref={username}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="bio">Biography</label>
          <textarea
            defaultValue={state.bio}
            id="bio"
            ref={bio}
            placeholder="Bio"
          />
        </div>

        <div className="form-radio-group">
          <label htmlFor="gender">Gender</label>
          <input
            defaultChecked={state.gender === 'Male'}
            type="radio"
            id="gender"
            name="gender"
            value="Male"
            onChange={(e) => setGender(e.target.value)}
          />
          {'   '}
          Male <br />
          <input
            defaultChecked={state.gender === 'Female'}
            type="radio"
            id="gender"
            value="Female"
            name="gender"
            onChange={(e) => setGender(e.target.value)}
          />
          {'  '} Female
        </div>

        <div className="form-control">
          <label htmlFor="website">Website</label>
          <input
            defaultValue={state.website}
            type="url"
            id="website"
            ref={website}
            placeholder="website"
          />
        </div>
        <div className="form-control">
          <label htmlFor="location">Location</label>
          <input
            defaultValue={state.location}
            type="text"
            id="location"
            ref={location}
            placeholder="location"
          />
        </div>
        <button type="submit">Edit Profile</button>
      </form>
    </div>
  )
}

export default EditProfile
