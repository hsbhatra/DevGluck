import React, { Component } from 'react'
import DesktopNavbar from '../components/DesktopNavbar'
import Blog from "../components/blogs/Blog"

export default function Blogs() {
  const blogs = []

  return (
    <>
        <DesktopNavbar/>

        <div className='pt-24'>
            <Blog/>
            {/* {blogs.map((blog, idx)=>{
                <Blog blog={blog} key={idx}/>
            })} */}
        </div>
    </>
  )
}
