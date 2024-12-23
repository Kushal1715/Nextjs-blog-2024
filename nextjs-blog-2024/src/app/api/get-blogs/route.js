import connectToDB from "@/database"
import Blog from "@/models/blog";
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDB();

    const extractBlogDatafromDatabase = await Blog.find({})

    if (extractBlogDatafromDatabase) {
      return NextResponse.json({
        success: true,
        data: extractBlogDatafromDatabase
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'No blog found'
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