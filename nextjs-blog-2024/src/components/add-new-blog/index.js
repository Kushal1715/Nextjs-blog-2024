'use client'

import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AddNewBlog = ({ openBlogDialog, setOpenBlogDialog }) => {
  return (
    <>
      <div className=''>
        <button className='bg-black text-white px-6 py-2 rounded' onClick={() => setOpenBlogDialog(true)}>Add New Blog</button>
      </div>
      <Dialog open={openBlogDialog} onOpenChange={setOpenBlogDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input id="title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input id="description" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  )
}

export default AddNewBlog;