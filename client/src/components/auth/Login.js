import React, { useState, useContext } from 'react'
import './Login.css'
import { AuthContext } from '../../context/AuthContext'
import { useHistory, Link } from 'react-router-dom'
import AuthError from '../error/authError'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const [loadig, setloading] = useState(false)

  const { setUserData } = useContext(AuthContext)
  const history = useHistory()

  const handleLogin = async (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }

    setloading(true)

    try {
      const login = await axios.post('/api/auth/login', userData)
      const token = login.data.token

      await localStorage.setItem('auth-token', `Bearer ${token}`)

      const getMe = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUserData({
        token: token,
        user: getMe.data,
        isAuthenticated: true,
      })

      history.push('/')
    } catch (err) {
      setloading(false)
      setError(err.response.data.error)
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h2>Log into your account</h2>
        {error !== undefined ? <AuthError error={error} /> : null}
        <div className="form-control">
          <label>Email </label>
          <input
            type="email"
            autoFocus
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label>Password </label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loadig}>
          {' '}
          {loadig ? (
            <span>
              <i
                className="fa fa-circle-o-notch fa-spin"
                style={{ marginRight: '5px', color: '#fff', fontSize: '20px' }}
              />{' '}
              Logging in 😂
            </span>
          ) : (
            'Login'
          )}
        </button>

        <Link
          to="/register"
          style={{
            textAlign: 'center',
            display: 'block',
            textDecoration: 'none',
            color: 'blue',
            margin: '15px 0px',
            fontSize: '15px',
          }}
        >
          Don't have an account create one here!
        </Link>
      </form>
    </div>
  )
}

export default Login
