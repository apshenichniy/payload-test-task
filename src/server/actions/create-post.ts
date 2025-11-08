'use server'

import { getPayload } from '@/lib/get-payload'
import { getPayloadUser } from '@/lib/get-payload-user'
import { revalidatePath } from 'next/cache'

/**
 * Create a new post
 * @param formData - The form data containing the post title, content, and categories
 * @returns {Promise<{success: boolean, error?: string}>} - The result of the post creation
 */
export async function createPost(formData: FormData) {
  // only allow logged in users to create posts
  const user = await getPayloadUser()

  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // parse form data
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const categoriesString = formData.get('categories') as string

  if (!title) {
    return { success: false, error: 'Title is required' }
  }

  if (!categoriesString) {
    return { success: false, error: 'At least one category is required' }
  }

  const categories = JSON.parse(categoriesString) as string[]

  if (categories.length === 0) {
    return { success: false, error: 'At least one category is required' }
  }

  try {
    const payload = await getPayload()

    await payload.create({
      collection: 'posts',
      data: {
        title,
        content,
        categories: categories.map((id) => parseInt(id)),
        owner: user.id,
      },
    })

    revalidatePath('/')

    return { success: true }
  } catch (error) {
    console.error('Error creating post:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create post',
    }
  }
}
