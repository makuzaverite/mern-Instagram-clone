import React, { useContext, useEffect, useCallback } from 'react'
import Avatar from './avatar.png'
import axios from 'axios'
import './Profile.css'
import { ProfileContext } from '../../../context/ProfileContext'
import Spinner from '../../layout/Spinner'
import { useHistory } from 'react-router-dom'
import { profile_types } from '../../../actions/profile_types'

const Profile = () => {
  const { profileState, profileDispatch } = useContext(ProfileContext)

  const changeProfile = useCallback(profileDispatch, [profileState])

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
          changeProfile({
            type: profile_types.SET_PROFILE,
            payload: prof.data.data,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    currentLoggedIn()
  }, [changeProfile])

  const history = useHistory()

  const handleEdit = () => history.push('/profile/edit')

  return Object.keys(profileState).length === 0 &&
    profileState.constructor === Object ? (
    <Spinner />
  ) : (
    <div className="profile-page">
      <section className="profile">
        <div className="profile-avatar" style={{ margin: 'auto' }}>
          <img src={Avatar} alt="avatar" align="center" />
        </div>
        <div className="profile-details">
          {profileState.username ? (
            <p>
              username:{' '}
              <span style={{ fontWeight: 'bold' }}>
                {profileState.username}
              </span>
            </p>
          ) : null}

          {profileState.bio ? (
            <p>
              Bio:{' '}
              <span style={{ fontWeight: 'bold' }}>{profileState.bio}</span>{' '}
            </p>
          ) : null}

          {profileState.gender ? (
            <p>
              Gender:{' '}
              <span style={{ fontWeight: 'bold' }}>{profileState.gender}</span>
            </p>
          ) : null}
          {profileState.website ? (
            <p>
              Website:{' '}
              <a href={profileState.website}>{profileState.website} </a>
            </p>
          ) : null}

          {profileState.location ? (
            <p>
              Location:{' '}
              <span style={{ fontWeight: 'bold' }}>
                {profileState.location}
              </span>
            </p>
          ) : null}

          <button onClick={handleEdit} className="edit-btn">
            Edit Profile
          </button>
        </div>
      </section>
    </div>
  )
}

export default Profile
