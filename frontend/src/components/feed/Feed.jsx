import React from 'react'
import Post from './Post'
import Share from './Share'

const Feed = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 overflow-x-hidden">
     {/* <Share /> */}
      <Post />
      <Post />
      <Post />
      <Post />
      
    </div>
  )
}

export default Feed
