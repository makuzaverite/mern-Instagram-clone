import React, { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { AuthReducer } from '../reducers/auth_reducer'
import { auth_actions } from '../actionsTypes/action_types'

const initialState = {
	token: '',
	user: {
		_id: '',
		firstname: '',
		lastname: '',
		email: '',
		password: '',
	},
	isAuthenticated: false,
	isLoading: true,
}

export const AuthContext = createContext()

const AuthcontextProvider = (props) => {
	const [state, dispatch] = useReducer(AuthReducer, initialState)

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
						Authorization: `Bearer ${token}`,
					},
				})

				if (checkToken.data) {
					const { data } = checkToken.data
					dispatch({
						type: auth_actions.LOGIN_SUCCESS,
						payload: { data, token },
					})
				}
			} catch (error) {
				dispatch({ type: auth_actions.LOGIN_FAILURE })
			}
		}
		checkLoggedIn()
	}, [])

	return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>
}

export default AuthcontextProvider
