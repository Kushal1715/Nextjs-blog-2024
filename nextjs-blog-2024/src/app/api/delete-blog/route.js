import connectToDB from "@/database"
import Blog from "@/models/blog";
import { NextResponse } from "next/server"

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get('id');

    if (!blogId) {
      return NextResponse.json({
        success: false,
        message: 'blog id is required'
      })
    }

    const deleteBlog = await Blog.findByIdAndDelete(blogId);
    if (deleteBlog) {
      return NextResponse.json({
        success: true,
        message: 'blog deleted successfully'
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'something went wrong'
      })
    }

  } catch (e) {
    console.log(e)
    return NextResponse.json({
      success: false,
      message: 'something went wrong please try again'
    })
  }
}