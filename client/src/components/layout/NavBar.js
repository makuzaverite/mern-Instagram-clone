import React, { useContext } from 'react'
import './NavBar.css'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Avatar from '../pages/avatar.png'
import HomeIcon from './home-icon.webp'
import NewPost from './newpost.webp'

export default function NavBar() {
  const { userData, setUserData } = useContext(AuthContext)
  const history = useHistory()
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
      isAuthenticated: false,
    })
    localStorage.setItem('auth-token', '')
    history.push('/login')
  }

  if (userData.isLoading) {
    return null
  } else {
    return (
      <nav>
        <span>
          <Link to="/">iDrip</Link>
        </span>
        {userData.user ? (
          <ul>
            {/* <li>
              <Link to="/">
                <i
                  className="fa fa-plus-square-o fa-2x"
                  style={{ position: 'relative', left: '5px', top: '10px' }}
                ></i>
              </Link>
            </li> */}

            <li>
              <Link to="/">
                <img
                  src={HomeIcon}
                  alt="Avatar"
                  align="center"
                  tooltip="profile"
                  // width="100px"
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
