import React, { useState, useEffect } from 'react'
import Spinner from '../../layout/Spinner'
import './EditProfile.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function EditProfile() {
  const history = useHistory()

  const [userProfile, setUserProfile] = useState({
    follower: [],
    gender: undefined,
    location: undefined,
    profilePhotos: undefined,
    username: undefined,
    website: undefined,
    bio: undefined,
    id: undefined,
  })
  const [website, setWebiste] = useState()
  const [bio, setBio] = useState()
  const [location, setLocation] = useState()
  const [username, setUsername] = useState()
  const token = localStorage.getItem('auth-token')

  useEffect(() => {
    const MyProfile = async () => {
      const token = await localStorage.getItem('auth-token')
      const profile = await axios.get('/api/profile/me', {
        headers: {
          Authorization: token,
        },
      })
      setUserProfile({
        follower: profile.data.data.follower,
        gender: profile.data.data.gender,
        location: profile.data.data.location,
        profilePhotos: profile.data.data.profilePhotos,
        username: profile.data.data.username,
        website: profile.data.data.website,
        bio: profile.data.data.bio,
        id: profile.data.data._id,
      })
    }

    MyProfile()
  }, [])

  useEffect(() => {
    setUsername(userProfile.username)
    setBio(userProfile.bio)
    setWebiste(userProfile.website)
    setLocation(userProfile.location)
  }, [userProfile])

  const handleEdit = async (e) => {
    e.preventDefault()
    const profile = {
      username: username,
      website: website,
      bio: bio,
      location: location,
    }

    try {
      await axios.put(`/api/profile/${userProfile.id}`, profile, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      history.push('/profile')
    } catch (error) {
      console.log(error.response.message)
    }
  }

  return !userProfile.username ? (
    <Spinner />
  ) : (
    <div className="edit-profile">
      <form onSubmit={handleEdit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            // defaultValue={`${userData.user.firstname}${userData.user.lastname}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="bio">Biography</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
          />
        </div>

        <div className="form-control">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            value={website}
            onChange={(e) => setWebiste(e.target.value)}
            placeholder="website"
          />
        </div>

        <div className="form-control">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="location"
          />
        </div>

        <button type="submit">Edit Profile</button>
      </form>
    </div>
  )
}

export default EditProfile
