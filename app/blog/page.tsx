export const revalidate = 86400

import { BookOpen } from 'lucide-react'
import BlogExplorer from '@/components/blog/BlogExplorer'

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
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-navy text-white pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-brand-bright-blue/40 bg-brand-bright-blue/10 text-brand-bright-blue text-body-sm font-medium">
                <BookOpen className="h-4 w-4 mr-2" />
                Resources & Insights
              </span>
            </div>
            <h1 className="text-h1 font-extrabold mb-6 leading-tight">
              Commercial Cleaning Resources & Tips
            </h1>
            <p className="text-body text-white/80 leading-relaxed">
              Expert advice for facility managers and business owners on maintaining clean, healthy,
              and productive workspaces.
            </p>
          </div>
        </div>
      </section>

      <BlogExplorer posts={blogPosts} categories={categories} />
    </div>
  )
}
