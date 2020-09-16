import { post_types } from '../actionsTypes/post_types'

export const PostReducer = (state, action) => {
	switch (action.type) {
		case post_types.SET_POST:
			return {
				posts: action.payload.data,
				isLoading: false,
			}
		case post_types.GET_SINGLE_POST:
			return {
				posts: action.payload,
				isLoading: false,
			}
		case post_types.ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
				isLoading: false,
			}
		case post_types.DELETE_POST:
			return {
				posts: state.posts.filter((post) => post._id !== action.payload),
				isLoading: false,
			}
		case post_types.ADD_LIKE:
			return {
				...state,
				posts: state.posts.map((post) => {
					if (post._id === action.payload._id) return (post = action.payload)
					return post
				}),
				isLoading: false,
			}
		case post_types.UN_LIKE:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? (post = action.payload) : post
				),
				isLoading: false,
			}
		case post_types.ADD_COMMENT:
			return {
				posts: state.posts.map((post) => {
					if (post._id === action.payload._id) return (post = action.payload)
					return post
				}),
				isLoading: false,
			}
		case post_types.DELETE_COMMENT:
			return {
				...state,
				posts: action.payload,
			}

		default:
			return state
	}
}
