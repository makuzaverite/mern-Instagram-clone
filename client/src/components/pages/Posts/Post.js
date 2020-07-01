import React from 'react'

function Post(props) {
  const { date, postPhoto, username } = props.post
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
      </div>
    </div>
  )
}

export default Post
