'use client'

import { useState } from "react"
import AddNewBlog from "../add-new-blog"

const initialBlogData = {
  title: '',
  description: ''
}


function BlogOverview() {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState(initialBlogData)

  console.log(blogs)
  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog openBlogDialog={openBlogDialog} setOpenBlogDialog={setOpenBlogDialog} loading={loading} setLoading={setLoading} blogs={blogs} setBlogs={setBlogs} />
      <h1>Blog List Section</h1>
    </div>
  )
}

export default BlogOverview