import React, { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { AuthReducer } from '../reducers/auth_reducer'
import { auth_actions } from '../actions/action_types'

const initialState = {
  token: '',
  user: '',
  isAuthenticated: false,
  isLoading: true,
}

export const AuthContext = createContext()

const AuthcontextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  useEffect(() => {
    let mounted = true
    const checkLoggedIn = async () => {
      try {
        let token = await localStorage.getItem('auth-token')
        if (token === null) {
          localStorage.setItem('auth-token', '')
          token = ''
        }
        const checkToken = await axios.get('/api/auth/me', {
          headers: {
            Authorization: token,
          },
        })

        if (checkToken.data) {
          const { data } = checkToken.data
          if (mounted) {
            dispatch({
              type: auth_actions.LOGIN_SUCCESS,
              payload: { data, token },
            })
          }
        }
      } catch (error) {
        dispatch({ type: auth_actions.LOGIN_FAILURE })
      }
    }

    checkLoggedIn()
    return () => (mounted = false)
  }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthcontextProvider
