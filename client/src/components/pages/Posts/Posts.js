import React, { useContext } from 'react'
import './Post.css'
import Post from './Post'
import Spinner from '../../layout/Spinner'
import { PostContext } from '../../../context/PostContext'
import { AuthContext } from '../../../context/AuthContext'

function Posts() {
  const { postState } = useContext(PostContext)
  const { state } = useContext(AuthContext)

  return state.isLoading ? (
    <Spinner />
  ) : (
    <section className="posts-section">
      <div>
        {postState.posts.length !== 0 ? (
          postState.posts.map((post) => (
            <Post key={`${post._id}`} post={post} creator={state.user._id} />
          ))
        ) : (
          <p
            style={{
              textAlign: 'center',
              fontFamily: 'Poppins',
              marginTop: '10rem',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            No post found{' '}
            <span role="img" aria-labelledby="panda1">
              '😒'
            </span>{' '}
            ?
          </p>
        )}
      </div>
    </section>
  )
}

export default Posts
