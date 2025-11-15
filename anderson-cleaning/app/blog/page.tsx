'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'

const blogPosts = [
  {
    slug: 'office-cleaning-checklist-flu-season',
    title: 'Office Cleaning Checklist for Flu Season',
    excerpt:
      'Protect your employees and maintain productivity with our comprehensive flu season cleaning guide. Learn which high-touch areas need extra attention and how often to disinfect.',
    category: 'Health & Safety',
    readTime: '5 min read',
    publishedDate: '2024-10-15',
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800&q=80',
  },
  {
    slug: 'benefits-green-cleaning-workplace',
    title: 'Benefits of Green Cleaning in the Workplace',
    excerpt:
      'Discover how eco-friendly cleaning products and practices can improve air quality, reduce employee sick days, and demonstrate your company\'s commitment to sustainability.',
    category: 'Sustainability',
    readTime: '6 min read',
    publishedDate: '2024-10-08',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&q=80',
  },
  {
    slug: 'commercial-cleaning-frequency-guide',
    title: 'How Often Should Your Office Be Professionally Cleaned?',
    excerpt:
      'Not sure whether you need daily, weekly, or bi-weekly cleaning? This guide breaks down cleaning frequency by facility type, square footage, and employee count.',
    category: 'Best Practices',
    readTime: '7 min read',
    publishedDate: '2024-09-22',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
  },
  {
    slug: 'medical-facility-cleaning-standards',
    title: 'Medical Facility Cleaning: Meeting OSHA & CDC Standards',
    excerpt:
      'Healthcare facilities require specialized cleaning protocols. Learn about the strict standards we follow and why medical-grade disinfection matters.',
    category: 'Healthcare',
    readTime: '8 min read',
    publishedDate: '2024-09-10',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80',
  },
  {
    slug: 'choosing-commercial-cleaning-company',
    title: '10 Questions to Ask Before Hiring a Commercial Cleaning Company',
    excerpt:
      'Make an informed decision with our facility manager\'s guide. From insurance coverage to employee vetting, here\'s what you need to know before signing a contract.',
    category: 'Buyer\'s Guide',
    readTime: '10 min read',
    publishedDate: '2024-08-28',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
  },
  {
    slug: 'floor-care-maintenance-tips',
    title: 'Extending the Life of Commercial Flooring: Care & Maintenance',
    excerpt:
      'Proper floor maintenance saves thousands in replacement costs. Learn about strip and wax schedules, daily care routines, and when to call the professionals.',
    category: 'Maintenance',
    readTime: '6 min read',
    publishedDate: '2024-08-15',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
  },
]

const categories = ['All', 'Health & Safety', 'Sustainability', 'Best Practices', 'Healthcare', "Buyer\'s Guide", 'Maintenance']

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 bg-accent-500/20 border border-accent-400/30 rounded-full text-accent-300 text-sm font-medium">
                <BookOpen className="h-4 w-4 mr-2" />
                Resources & Insights
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Commercial Cleaning Resources & Tips
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Expert advice for facility managers and business owners on maintaining clean, healthy,
              and productive workspaces.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  category === 'All'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Featured Image */}
                <div className="relative h-48 bg-gray-200 dark:bg-slate-700 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
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

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" size="sm" className="w-full group">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get Cleaning Tips Delivered
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Subscribe to our newsletter for monthly cleaning tips, industry updates, and exclusive
              offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="your.email@company.com"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
              />
              <Button variant="primary" size="lg">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
