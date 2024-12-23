import BlogOverview from "@/components/blog-overview";

async function getBlogs() {
  try {
    const response = await fetch('http://localhost:3000/api/get-blogs');
    const result = await response.json();
    if (result?.data) {
      return result.data;
    }
  } catch (e) {
    throw new Error(e)
  }
}

export default async function Blogs() {

  const blogs = await getBlogs();
  console.log(blogs)
  return (
    <BlogOverview />
  )
}