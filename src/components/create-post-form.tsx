'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import MultiSelect from '@/components/ui/multi-select'
import { createPost } from '@/server/actions/create-post'
import type { Category } from '@/payload-types'

interface CreatePostFormProps {
  categories: Category[]
}

export function CreatePostForm({ categories }: CreatePostFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const categoryOptions = categories.map((cat) => ({
    label: cat.title,
    value: String(cat.id),
  }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('categories', JSON.stringify(selectedCategories))

      const result = await createPost(formData)

      if (result.success) {
        setSuccess(true)
        setTitle('')
        setContent('')
        setSelectedCategories([])
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError(result.error || 'Failed to create post')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter post content"
          rows={6}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="categories">Categories</Label>
        <MultiSelect
          options={categoryOptions}
          value={selectedCategories}
          onChange={setSelectedCategories}
          placeholder="Select categories"
          disabled={isSubmitting}
        />
      </div>

      {error && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      {success && (
        <div className="p-3 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 text-sm">
          Post created successfully!
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating...' : 'Create Post'}
      </Button>
    </form>
  )
}
