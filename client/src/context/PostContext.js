import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { PostReducer } from '../reducers/post_reducer'
import { post_types } from '../actionsTypes/post_types'

const initialState = {
	posts: [],
	isLoading: true,
}

export const PostContext = createContext(null)

const PostContextProvider = (props) => {
	const [postState, postDispatch] = useReducer(PostReducer, initialState)

	useEffect(() => {
		let mounted = true
		const getPost = async () => {
			try {
				const token = await localStorage.getItem('auth-token')
				const res = await axios.get('/api/post', {
					headers: {
						Authorization: token,
					},
				})

				if (res.data.data) {
					if (mounted) {
						postDispatch({
							type: post_types.SET_POST,
							payload: { data: res.data.data },
						})
					}
				}
			} catch (error) {
				console.log(error.response)
			}
		}
		getPost()
		return () => (mounted = false)
	}, [])

	return (
		<PostContext.Provider value={{ postState, postDispatch }}>
			{props.children}
		</PostContext.Provider>
	)
}

export default PostContextProvider
