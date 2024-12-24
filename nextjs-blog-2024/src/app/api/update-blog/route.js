import connectToDB from "@/database"
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server"

const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required()
})



export async function PUT(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const currentBlogId = searchParams.get('id');

    if (!currentBlogId) {
      return NextResponse.json({
        success: false,
        message: 'blog id is required'
      })
    }

    const { title, description } = await req.json();

    const { error } = EditBlog.validate({ title, description });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message
      })
    }

    const updateBlog = await Blog.findOneAndUpdate({ _id: currentBlogId },
      { title, description }, { new: true });

    if (updateBlog) {
      return NextResponse.json({
        success: true,
        message: 'blog updated successfully',
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