import React from 'react'
import Blog from "../components/blogs/Blog"

export default function Blogs() {
  // const blogs = []

  return (
    <div className='pt-4'>
        <Blog/>
        {/* {blogs.map((blog, idx)=>{
            <Blog blog={blog} key={idx}/>
        })} */}
    </div>
  )
}
