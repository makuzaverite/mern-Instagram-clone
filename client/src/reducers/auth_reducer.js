import { auth_actions } from '../actionsTypes/action_types'

export const AuthReducer = (state, action) => {
	switch (action.type) {
		case auth_actions.LOGIN_SUCCESS:
			return {
				...state,
				token: action.payload.token,
				user: {
					...state.user,
					email: action.payload.data.email,
					firstname: action.payload.data.firstname,
					lastname: action.payload.data.lastname,
					password: action.payload.data.password,
					_id: action.payload.data._id,
				},
				isAuthenticated: true,
				isLoading: false,
			}
		case auth_actions.LOGIN_FAILURE:
			return {
				...state,
				token: '',
				user: {
					...state.user,
					email: '',
					firstname: '',
					lastname: '',
					password: '',
					_id: '',
				},
				isAuthenticated: false,
				isLoading: false,
			}

		case auth_actions.LOGOUT:
			return {
				...state,
				token: undefined,
				user: {
					...state.user,
					email: '',
					firstname: '',
					lastname: '',
					password: '',
					_id: '',
				},
				isAuthenticated: false,
				isLoading: false,
			}
		default:
			return state
	}
}
