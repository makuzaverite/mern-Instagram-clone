import { post_types } from '../actions/post_types'

export const PostReducer = (state, action) => {
  switch (action.type) {
    case post_types.GET_POST:
      return {
        posts: action.payload.data,
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
    default:
      return state
  }
}
