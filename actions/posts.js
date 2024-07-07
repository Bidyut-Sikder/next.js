
'use server'

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export async function createPost(prevState, formData) {

  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  let errors = []

  if (!title || title.trim().length === 0) {
    errors.push('Title is required.')
  }

  if (!content || title.trim().length === 0) {
    errors.push('Content is required.')
  }
  if (!image || image.size === 0) {
    errors.push('Image is required.')
  }


  if (errors.length > 0) {
    return { errors }
  }

  let image_url;
  try {
    image_url = await uploadImage(image)

  } catch (error) {
    throw new Error('Image upload failed,Try again later.')
  }



  await storePost({
    imageUrl: image_url,
    title,
    content,
    userId: 1
  })

  revalidatePath('/', 'layout')
  redirect('/feed')

}







export const togglePostLikeStatus = async (postId, foo) => {

  await updatePostLikeStatus(postId, 2)

  revalidatePath('/', 'layout')


}



















