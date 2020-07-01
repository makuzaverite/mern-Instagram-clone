import React, { useContext } from 'react'
import './Post.css'
import Post from './Post'
import Spinner from '../../layout/Spinner'
import { PostContext } from '../../../context/PostContext'

function Posts() {
  const { posts, isLoading } = useContext(PostContext)

  return isLoading ? (
    <Spinner />
  ) : (
    <section className="posts-section">
      {/* <div>
        <NewPost />
      </div> */}
      <div>
        {posts.length !== 0 ? (
          posts.map((post) => <Post key={`${post._id}`} post={post} />)
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
