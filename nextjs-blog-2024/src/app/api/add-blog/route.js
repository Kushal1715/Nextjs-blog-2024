import connectToDB from "@/database"
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server"

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required();
})



export async function POST(req) {
  try {
    await connectToDB();

    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;
    const { error } = AddNewBlog.validate({ title, description });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message
      })
    }

    const newlyCreatedBlogData = await Blog.create(extractBlogData)

    if (newlyCreatedBlogData) {
      return NextResponse.json({
        success: true,
        message: 'new blog added successfully'
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'something went wrong please try again'
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