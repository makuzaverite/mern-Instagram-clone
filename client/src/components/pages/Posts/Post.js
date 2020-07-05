import React, { useContext } from 'react'
import axios from 'axios'
import { post_types } from '../../../actions/post_types'
import { PostContext } from '../../../context/PostContext'

function Post(props) {
  const { postDispatch } = useContext(PostContext)
  const { date, postPhoto, username, user, _id } = props.post
  const creator = props.creator

  const handleDelePost = async () => {
    const token = await localStorage.getItem('auth-token')
    await axios.delete(`/api/post/${_id}`, {
      headers: {
        Authorization: token,
      },
    })

    postDispatch({ type: post_types.DELETE_POST, payload: _id })
  }

  return (
    <div className="post-section">
      <div className="post-ownership">
        <span>{username}</span>
        <span>{new Date(date).toLocaleString()}</span>
      </div>
      <img className="post-image" src={postPhoto} alt={'name'} />
      <div className="reaction">
        <i className="fa fa-heart-o" />
        <i className="fa fa-comment-o" />
        <i className="fa fa-pencil-square-o" />
        {creator === user ? (
          <i className="fa fa-trash" onClick={handleDelePost}></i>
        ) : null}
      </div>
    </div>
  )
}

export default Post
