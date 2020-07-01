import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Spinner from './components/layout/Spinner'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { userData } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={(props) =>
        userData.isLoading ? (
          <Spinner />
        ) : userData.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default ProtectedRoute
