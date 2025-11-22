'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  publishedDate: string
  image: string
}

interface BlogExplorerProps {
  posts: BlogPost[]
  categories: string[]
}

export default function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterError, setNewsletterError] = useState<string | null>(null)

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === selectedCategory)

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newsletterEmail) return
    setNewsletterStatus('loading')
    setNewsletterError(null)
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Unable to subscribe right now.')
      }
      setNewsletterStatus('success')
      setNewsletterEmail('')
      setTimeout(() => setNewsletterStatus('idle'), 4000)
    } catch (error) {
      setNewsletterStatus('error')
      setNewsletterError(
        error instanceof Error
          ? error.message
          : 'There was an error subscribing. Please try again.'
      )
    }
  }

  return (
    <>
      <section className="bg-neutral-off-white dark:bg-slate-900 border-b border-neutral-light-grey dark:border-slate-700 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = category === selectedCategory
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all border ${
                    isActive
                      ? 'bg-brand-emerald text-white border-brand-emerald shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-neutral-charcoal/80 dark:text-white/80 border-neutral-light-grey dark:border-slate-700 hover:bg-neutral-light-grey dark:hover:bg-slate-700'
                  }`}
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald"
              >
                <div className="relative h-48 bg-neutral-light-grey dark:bg-slate-700 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    quality={85}
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 bg-brand-emerald text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-neutral-charcoal/60 dark:text-neutral-charcoal/50 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.publishedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <h2 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-neutral-charcoal/70 dark:text-white/80 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="w-full">
                    <span className="inline-flex items-center text-brand-emerald text-sm font-semibold">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
              Get Cleaning Tips Delivered
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80 mb-8">
              Subscribe to our newsletter for monthly cleaning tips, industry updates, and exclusive
              offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubscribe}>
              <input
                type="email"
                name="email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="your.email@company.com"
                required
                className="flex-1 px-4 py-3 border border-neutral-light-grey dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent dark:bg-slate-800 dark:text-white"
              />
              <Button type="submit" variant="accent" size="lg" isLoading={newsletterStatus === 'loading'}>
                {newsletterStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
              </Button>
            </form>
            {newsletterStatus === 'error' && newsletterError && (
              <p className="text-sm text-red-500 mt-2">{newsletterError}</p>
            )}
            {newsletterStatus === 'success' && (
              <p className="text-sm text-brand-emerald mt-2">Thanks! Check your inbox to confirm.</p>
            )}
            <p className="text-xs text-neutral-charcoal/60 dark:text-neutral-charcoal/50 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
