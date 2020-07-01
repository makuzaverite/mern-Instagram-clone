import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

const AuthcontextProvider = (props) => {
  const [userData, setUserData] = useState({
    token: '',
    user: '',
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
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
          setUserData({
            token: token,
            user: data,
            isAuthenticated: true,
            isLoading: false,
          })
        }

        if (!checkToken.data) {
          setUserData({
            token: token,
            user: '',
            isAuthenticated: false,
            isLoading: false,
          })
        }
      } catch (error) {
        setUserData({
          token: '',
          user: '',
          isAuthenticated: false,
          isLoading: false,
        })
      }
    }

    checkLoggedIn()
  }, [])

  // const isLoggedIn = () => {
  //   if (userData.token && userData.user) return true
  //   return false
  // }

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthcontextProvider
