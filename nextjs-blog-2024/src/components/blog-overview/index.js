'use client'

import { useEffect, useState } from "react"
import AddNewBlog from "../add-new-blog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { Label } from "@radix-ui/react-label"

const initialBlogData = {
  title: '',
  description: ''
}


function BlogOverview({ blogList }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState(initialBlogData)
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [])

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
        router.refresh();
      }
    } catch (e) {
      setLoading(false);
      setBlogs(initialBlogData)
    }
  }

  async function handleBlogDelete(id) {
    try {
      const response = await fetch(`/api/delete-blog?id=${id}`, {
        method: 'DELETE'
      })
      const result = await response.json();
      if (result?.success) {
        router.refresh();
      }

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog addBlogs={addBlogs} initialBlogData={initialBlogData} openBlogDialog={openBlogDialog} setOpenBlogDialog={setOpenBlogDialog} loading={loading} setLoading={setLoading} blogs={blogs} setBlogs={setBlogs} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {
          blogList && blogList.length > 0 ? blogList.map((blog, index) => <Card key={index} className="p-5">
            <CardContent>
              <CardTitle className="mb-5">{blog.title}</CardTitle>
              <CardDescription>{blog.description}</CardDescription>
              <div className="mt-5 flex gap-5 items-center">
                <Button>Edit</Button>
                <Button onClick={() => handleBlogDelete(blog._id)}>Delete</Button>
              </div>

            </CardContent>
          </Card>) : <Label className="text-3xl font-bold w-full mx-auto">No blog found. Please add Blog</Label>
        }
      </div>
    </div>
  )
}

export default BlogOverview