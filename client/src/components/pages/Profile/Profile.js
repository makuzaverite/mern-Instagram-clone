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
        <div className="profile-avatar" style={{ margin: 'auto' }}>
          <img src={Avatar} alt="avatar" align="center" />
        </div>
        <div className="profile-details">
          {state.username ? (
            <p>
              username:{' '}
              <span style={{ fontWeight: 'bold' }}>{state.username}</span>
            </p>
          ) : null}

          {state.bio ? (
            <p>
              Bio: <span style={{ fontWeight: 'bold' }}>{state.bio}</span>{' '}
            </p>
          ) : null}

          {state.gender ? (
            <p>
              Gender: <span style={{ fontWeight: 'bold' }}>{state.gender}</span>
            </p>
          ) : null}
          {state.website ? (
            <p>
              Website: <a href={state.website}>{state.website} </a>
            </p>
          ) : null}

          {state.location ? (
            <p>
              Location:{' '}
              <span style={{ fontWeight: 'bold' }}>{state.location}</span>
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
