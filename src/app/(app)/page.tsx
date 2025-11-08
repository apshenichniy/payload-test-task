import { getPayloadUser } from '@/lib/get-payload-user'
import { redirect } from 'next/navigation'
import { getPayload } from '@/lib/get-payload'
import { CreatePostForm } from '@/components/create-post-form'
import { PostsList } from '@/components/posts-list'
import { LogoutButton } from '@/components/logout-button'

export default async function HomePage() {
  // check if user is logged in
  const user = await getPayloadUser()

  // if user is not logged in, redirect to login page
  if (!user) {
    redirect('/login')
  }

  // fetch categories
  const payload = await getPayload()
  const categories = await payload.find({
    collection: 'categories',
  })

  const posts = await payload.find({
    collection: 'posts',
    depth: 2, // fetch related categories and owner
    sort: '-createdAt', // newest first
    user: user.id,
  })

  return (
    <div className="flex flex-col items-center gap-8 p-10 max-w-2xl mx-auto relative">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-foreground mb-2">Hello, {user.name}!</h1>
        <p className="text-center text-muted-foreground mb-8">Create a new post</p>
      </div>

      <div className="absolute top-4 right-12">
        <LogoutButton />
      </div>

      <CreatePostForm categories={categories.docs} />

      <PostsList posts={posts.docs} />
    </div>
  )
}
