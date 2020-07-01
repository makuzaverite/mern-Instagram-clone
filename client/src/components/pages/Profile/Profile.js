import React, { useContext, useEffect, useState } from 'react'
import Avatar from './avatar.png'
import './Profile.css'
import axios from 'axios'
import { AuthContext } from '../../../context/AuthContext'
import Spinner from '../../layout/Spinner'
import { useHistory } from 'react-router-dom'

const Profile = () => {
  const { userData } = useContext(AuthContext)
  const [isLoadingProfile, setisLoadingProfile] = useState(true)
  const [currProfile, setcurrentProfile] = useState({
    username: undefined,
    bio: undefined,
    website: undefined,
    gender: undefined,
    location: undefined,
  })

  const history = useHistory()

  const handleEdit = () => history.push('/profile/edit')

  useEffect(() => {
    const currentLoggedIn = async () => {
      const token = await localStorage.getItem('auth-token')
      try {
        const prof = await axios.get(`/api/profile/me`, {
          headers: {
            Authorization: token,
          },
        })

        setcurrentProfile({
          username: prof.data.data.username,
          bio: prof.data.data.bio,
          website: prof.data.data.website,
          gender: prof.data.data.gender,
          location: prof.data.data.location,
        })
        setisLoadingProfile(false)
      } catch (error) {}
    }
    currentLoggedIn()
  }, [])

  return isLoadingProfile ? (
    <Spinner />
  ) : (
    <div className="profile-page">
      <section className="profile">
        <div className="profile-avatar">
          <img src={Avatar} alt="avatar" align="center" />
        </div>
        <div className="profile-details">
          {currProfile ? (
            <p>{currProfile.username}</p>
          ) : (
            <p>{userData.user.firstname + ' ' + userData.user.lastname}</p>
          )}

          {currProfile.bio ? <p>Bio {currProfile.bio}</p> : null}

          {currProfile.website ? (
            <p>
              Website <a href={currProfile.website}>{currProfile.website} </a>
            </p>
          ) : null}

          {currProfile.location ? (
            <p>Location: {currProfile.location}</p>
          ) : null}

          <button onClick={handleEdit} className="edit-btn">
            Edit Profile
          </button>
        </div>
      </section>
      <section>
        <h2>Posts</h2>
      </section>
    </div>
  )
}

export default Profile
