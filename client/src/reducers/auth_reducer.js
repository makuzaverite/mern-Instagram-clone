import { auth_actions } from '../actionsTypes/action_types'

export const AuthReducer = (state, action) => {
	switch (action.type) {
		case auth_actions.LOGIN_SUCCESS:
			return {
				token: action.payload.token,
				user: action.payload.data,
				isAuthenticated: true,
				isLoading: false,
			}
		case auth_actions.LOGIN_FAILURE:
			return {
				token: '',
				user: '',
				isAuthenticated: false,
				isLoading: false,
			}

		case auth_actions.LOGOUT:
			return {
				token: undefined,
				user: undefined,
				isAuthenticated: false,
				isLoading: false,
			}
		default:
			return state
	}
}
