import React, { useEffect, useState, useContext, useCallback } from 'react'
import axios from 'axios'
import './Post.css'
import Spinner from '../../../../components/layout/Spinner'
import { post_types } from '../../../../actions/post_types'
import { PostContext } from '../../../../context/PostContext'
import { AuthContext } from '../../../../context/AuthContext'

export default function Post({ match }) {
  const { postState, postDispatch } = useContext(PostContext)
  const { state } = useContext(AuthContext)
  const [post, setPost] = useState('')
  const [comment, setComment] = useState('')
  const id = match.params.id
  const token = localStorage.getItem('auth-token')

  const postChange = useCallback(postDispatch, [postState])

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/api/post/${id}`)
        setPost(res.data.data)
        postChange({
          type: post_types.GET_SINGLE_POST,
          payload: res.data.data,
        })
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  }, [id, postChange])

  const handleComment = async (e) => {
    e.preventDefault()
    if (comment.length === 0) {
      alert('Please add a comment')
      return
    }
    let token = await localStorage.getItem('auth-token')

    try {
      const res = await axios.post(
        `/api/post/comment/${post._id}`,
        { text: comment },
        {
          headers: {
            Authorization: token,
          },
        }
      )

      if (res.data.data) {
        setComment('')
        postDispatch({ type: post_types.ADD_COMMENT, payload: res.data.data })
      }
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleDelete = async (id) => {
    const res = await axios.delete(`/api/post/comment/${post._id}/${id}`, {
      headers: {
        Authorization: token,
      },
    })

    if (res.data.data)
      postDispatch({ type: post_types.DELETE_COMMENT, payload: res.data.data })
  }

  return postState.postPhoto ? (
    <Spinner />
  ) : (
    <>
      <section className="post__card">
        <p className="post__info">
          <span style={{ fontWeight: 'bold' }}>{post.username}</span>
          <span>{new Date(postState.posts.date).toLocaleDateString()}</span>
        </p>
        <img src={postState.posts.postPhoto} alt="post" />
      </section>
      <section className="comment__card">
        <form>
          <textarea
            autoFocus={true}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required={true}
            placeholder="comment here......"
          ></textarea>
          <input type="submit" value="Comment" onClick={handleComment} />
        </form>
        {postState.posts.comments !== undefined ? (
          postState.posts.comments.map((item) => (
            <p className="comment__msg" key={item._id.toString()}>
              {' '}
              <span>
                <span style={{ fontWeight: 'bold' }}>{item.username}</span>{' '}
                {item.text}
              </span>
              <span
                style={{
                  cursor: 'pointer',
                  color: 'red',
                  fontWeight: 'bolder',
                }}
                onClick={() => handleDelete(item._id)}
              >
                {state.user._id === item.user ? 'x' : null}
              </span>
            </p>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No comments found?</p>
        )}
      </section>
    </>
  )
}
