import React, { useEffect } from 'react'
import BlogItem from './BlogItem'
import AuthContext from '../context/auth/AuthContext';
import { useContext } from 'react';
function Blogs() {
  const context = useContext(AuthContext)
  const { posts, readAllPost } = context
  useEffect(() => {
    readAllPost()
    // eslint-disable-next-line
  }, [])
  return (
    <div className='container'>
      <h2 className='text-center' style={{
        marginTop: '70px'
      }}>Blogs</h2>
      {
        posts.map((post) => {
          return <div key={post.postTitle} className="container col-md-4 my-2">
            <BlogItem postTitle={post.postTitle} postDescription={post.postDescription} postDate={post.postedDate} />
          </div>
        })
      }

    </div>
  )
}

export default Blogs