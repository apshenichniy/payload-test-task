import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Post, Category, User } from '@/payload-types'

interface PostsListProps {
  posts: Post[]
}

export function PostsList({ posts }: PostsListProps) {
  if (posts.length === 0) {
    return (
      <div className="w-full max-w-4xl">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No posts yet. Create your first post above!
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-semibold text-foreground mb-4">Old Posts</h2>
      {posts.map((post) => {
        const owner = post.owner as User
        const categories = post.categories as Category[]
        const createdAt = new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })

        return (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  {owner && <CardDescription className="mt-1">by {owner.name}</CardDescription>}
                  <CardDescription className="mt-1">{createdAt}</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  {categories.map((category) => (
                    <Badge key={category.id} variant="secondary">
                      {category.title}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            {post.content && (
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}
