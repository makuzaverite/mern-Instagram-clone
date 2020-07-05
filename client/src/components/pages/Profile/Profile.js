import React, { useContext } from 'react'
import Avatar from './avatar.png'
import './Profile.css'
import { ProfileContext } from '../../../context/ProfileContext'
import Spinner from '../../layout/Spinner'
import { useHistory } from 'react-router-dom'

const Profile = () => {
  const { state } = useContext(ProfileContext)

  const history = useHistory()

  const handleEdit = () => history.push('/profile/edit')

  return Object.keys(state).length === 0 && state.constructor === Object ? (
    <Spinner />
  ) : (
    <div className="profile-page">
      <section className="profile">
        <div className="profile-avatar">
          <img src={Avatar} alt="avatar" align="center" />
        </div>
        <div className="profile-details">
          {state.username ? <p>username: {state.username}</p> : null}

          {state.bio ? <p>Bio: {state.bio}</p> : null}

          {state.gender ? <p>Gender: {state.gender}</p> : null}
          {state.website ? (
            <p>
              Website: <a href={state.website}>{state.website} </a>
            </p>
          ) : null}

          {state.location ? <p>Location: {state.location}</p> : null}

          <button onClick={handleEdit} className="edit-btn">
            Edit Profile
          </button>
        </div>
      </section>
    </div>
  )
}

export default Profile
