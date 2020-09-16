import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Spinner from './components/layout/Spinner'

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { state } = useContext(AuthContext)
	return (
		<Route
			{...rest}
			render={(props) =>
				state.isLoading ? (
					<Spinner />
				) : state.isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	)
}

export default ProtectedRoute
