import React, { useState, useContext } from 'react'
import './Register.css'
import { AuthContext } from '../../context/AuthContext'
import AuthError from '../error/authError'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import { auth_actions } from '../../actions/action_types'
// import { ProfileContext } from '../../context/ProfileContext'
// import { profile_types } from '../../actions/profile_types'

function Register() {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [cpassword, setcPassword] = useState()
  const [error, setError] = useState('')
  const [isLoading, setisLoading] = useState(false)

  const { dispatch } = useContext(AuthContext)
  const history = useHistory()

  const onHandleSubmit = async (e) => {
    e.preventDefault()

    setisLoading(true)
    if (fname.length < 3) {
      setisLoading(false)
      setError('firstname must be greater than 3 characters')
      return
    }

    if (lname.length < 3) {
      setisLoading(false)
      setError('lastname must be greater than 3 characters')
      return
    }

    if (password.length < 5) {
      setisLoading(false)
      setError('Password must be grater than 5 characters')
      return
    }

    if (password !== cpassword) {
      setisLoading(false)
      setError('Password did not match')
      return
    }

    setisLoading(true)

    setError(null)

    const newUser = {
      firstname: fname,
      lastname: lname,
      email: email,
      password: password,
    }

    try {
      const registrer = await axios.post('/api/auth/register', newUser)
      const token = registrer.data.token

      if (registrer.data.sucess) {
        await localStorage.setItem('auth-token', `Bearer ${token}`)
      }

      const getMe = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await axios.post(
        '/api/profile',
        {
          username: `${fname}${lname}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (getMe.data.sucess) {
        dispatch({
          type: auth_actions.LOGIN_SUCCESS,
          payload: { data: getMe.data.data, token: `Bearer ${token}` },
        })

        history.push('/')
      }
    } catch (error) {
      if (error.response.data.error === 'Duplicate field value entered') {
        setError('Email arleady exists')
        setisLoading(false)
      }
    }
  }

  return (
    <div className="register">
      <form onSubmit={onHandleSubmit}>
        <h2>iDrip Create a new account</h2>
        {error !== undefined ? <AuthError error={error} /> : null}
        <div className="form-control">
          <label>Firstname </label>
          <input
            type="text"
            autfocus="true"
            placeholder="Firstname"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>Lastname </label>
          <input
            type="text"
            placeholder="Lastname"
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>Email </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
        <div className="form-control">
          <label>confirm Password </label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setcPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {' '}
          {isLoading ? (
            <span>
              <i
                className="fa fa-circle-o-notch fa-spin"
                style={{ marginRight: '5px', color: '#fff', fontSize: '20px' }}
              />{' '}
              Registering 😂
            </span>
          ) : (
            'Register'
          )}
        </button>
        <Link
          to="/login"
          style={{
            textAlign: 'center',
            display: 'block',
            textDecoration: 'none',
            color: 'blue',
            margin: '15px 0px',
            fontSize: '15px',
          }}
        >
          Already have an account?
        </Link>
      </form>
    </div>
  )
}

export default Register
