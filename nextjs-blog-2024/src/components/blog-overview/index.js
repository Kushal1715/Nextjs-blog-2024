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

  async function addBlogs() {
    try {
      setLoading(true);
      const response = await fetch('/api/add-blog', {
        method: 'POST',
        body: JSON.stringify(blogs),
      })
      const result = await response.json();
      if (result?.success) {
        setOpenBlogDialog(false);
        setLoading(false);
        setBlogs(initialBlogData)
      }
    } catch (e) {
      setLoading(false);
      setBlogs(initialBlogData)
    }
  }

  console.log(blogs)
  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog addBlogs={addBlogs} initialBlogData={initialBlogData} openBlogDialog={openBlogDialog} setOpenBlogDialog={setOpenBlogDialog} loading={loading} setLoading={setLoading} blogs={blogs} setBlogs={setBlogs} />
      <h1>Blog List Section</h1>
    </div>
  )
}

export default BlogOverview