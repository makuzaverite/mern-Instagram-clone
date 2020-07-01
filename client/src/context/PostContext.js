import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const PostContext = createContext(null)

const PostContextProvider = (props) => {
  const [posts, setPosts] = useState([])
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    const getPost = async () => {
      try {
        const token = await localStorage.getItem('auth-token')
        const res = await axios.get('/api/post', {
          headers: {
            Authorization: token,
          },
        })
        if (res.data.data) {
          setPosts(res.data.data)
          setisLoading(false)
        }
      } catch (error) {
        console.log(error.response)
      }
    }
    getPost()
  }, [])

  return (
    <PostContext.Provider value={{ posts, setPosts, isLoading, setisLoading }}>
      {props.children}
    </PostContext.Provider>
  )
}

export default PostContextProvider
