import React, { useContext } from 'react'
import './NavBar.css'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ProfileContext } from '../../context/ProfileContext'
import Avatar from '../pages/avatar.png'
import HomeIcon from './home-icon.webp'
import NewPost from './newpost.webp'
import { auth_actions } from '../../actions/action_types'
import { profile_types } from '../../actions/profile_types'

export default function NavBar() {
  const { state, dispatch } = useContext(AuthContext)
  const { profileDispatch } = useContext(ProfileContext)
  const history = useHistory()
  const logout = () => {
    localStorage.setItem('auth-token', '')
    dispatch({ type: auth_actions.LOGOUT })
    profileDispatch({ type: profile_types.LOGOUT })
    history.push('/login')
  }

  if (state.isLoading) {
    return null
  } else {
    return (
      <nav>
        <span>
          <Link to="/">iDrip</Link>
        </span>
        {state.user ? (
          <ul>
            <li>
              <Link to="/">
                <img
                  src={HomeIcon}
                  alt="Avatar"
                  align="center"
                  tooltip="profile"
                  height="100px"
                />
              </Link>
            </li>

            <li>
              <Link to="/newPost">
                <img
                  src={NewPost}
                  alt="Avatar"
                  align="center"
                  tooltip="profile"
                  // width="100px"
                  height="100px"
                />
              </Link>
            </li>

            <li>
              <Link to="/profile">
                <img
                  src={Avatar}
                  alt="Avatar"
                  align="center"
                  tooltip="profile"
                />
              </Link>
            </li>
            <li onClick={logout} style={{ cursor: 'pointer' }}>
              Logout
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}
      </nav>
    )
  }
}
