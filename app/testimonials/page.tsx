'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Star, ExternalLink, Filter } from 'lucide-react'

interface Testimonial {
  id: string
  quote: string
  name: string
  title: string
  company: string
  industry: string
  service: string
  rating: number
  date: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'Anderson Cleaning transformed our medical office. Their attention to detail and understanding of healthcare sanitation protocols is exceptional. Every surface is spotless, and they use the right products for sensitive environments.',
    name: 'Dr. Sarah Mitchell',
    title: 'Practice Manager',
    company: 'Springfield Family Medicine',
    industry: 'Medical',
    service: 'Janitorial Services',
    rating: 5,
    date: '2024-11-05',
  },
  {
    id: '2',
    quote:
      'After struggling with unreliable contractors for years, Anderson Cleaning has been a game-changer. They show up on time, communicate proactively, and actually care about our facility. The 24/7 support is real—I called at 8 PM once and got a real person who solved my issue in 10 minutes.',
    name: 'Marcus Johnson',
    title: 'Facilities Director',
    company: 'TechHub Coworking',
    industry: 'Office',
    service: 'Office Cleaning',
    rating: 5,
    date: '2024-10-20',
  },
  {
    id: '3',
    quote:
      'We manage over 30 properties and Anderson Cleaning is the only vendor we trust for consistent quality across all locations. Their teams are professional, their pricing is transparent, and their response time is unmatched.',
    name: 'Jennifer Chang',
    title: 'Portfolio Manager',
    company: 'Northeast Property Group',
    industry: 'Property Management',
    service: 'Janitorial Services',
    rating: 5,
    date: '2024-10-10',
  },
  {
    id: '4',
    quote:
      "The green cleaning products they use don't trigger allergies or asthma in our students and staff. Anderson's team is background-checked and trained specifically for educational environments. We feel completely safe with them in our building.",
    name: 'Robert Williams',
    title: 'Superintendent',
    company: 'Westfield Public Schools',
    industry: 'Education',
    service: 'School Cleaning',
    rating: 5,
    date: '2024-09-15',
  },
  {
    id: '5',
    quote:
      "Our warehouse is huge and has unique challenges—oil spills, heavy foot traffic, and tight schedules. Anderson's team adapted quickly, created custom SOPs for our facility, and trained their staff on our specific safety requirements. Impressive.",
    name: 'Tom Bradley',
    title: 'Operations Manager',
    company: 'Valley Distribution Center',
    industry: 'Manufacturing',
    service: 'Industrial Cleaning',
    rating: 5,
    date: '2024-08-30',
  },
  {
    id: '6',
    quote:
      'We switched to Anderson for our retail showroom and immediately noticed the difference. The floors shine, the windows are streak-free, and they clean during off-hours so our customers never see them. Professional and thorough.',
    name: 'Lisa Martinez',
    title: 'Store Manager',
    company: 'Designer Home Furnishings',
    industry: 'Retail',
    service: 'Retail Cleaning',
    rating: 4,
    date: '2024-08-15',
  },
  {
    id: '7',
    quote:
      "Best investment we've made for our office. The supply management program means we never run out of soap, paper towels, or cleaning supplies. It's one less thing I have to worry about, and Anderson's bulk pricing actually saves us money.",
    name: "Kevin O'Brien",
    title: 'Office Manager',
    company: 'Hartford Law Associates',
    industry: 'Office',
    service: 'Supply Management',
    rating: 5,
    date: '2024-07-20',
  },
  {
    id: '8',
    quote:
      "After our tenant build-out, the space was a disaster—dust everywhere, adhesive on floors, construction debris in corners. Anderson's post-construction cleaning team made it move-in ready in 2 days. Incredible turnaround.",
    name: 'Amanda Foster',
    title: 'Project Coordinator',
    company: 'Summit Commercial Builders',
    industry: 'Property Management',
    service: 'Post-Construction Cleaning',
    rating: 5,
    date: '2024-06-10',
  },
  {
    id: '9',
    quote:
      'What impressed me most was their account manager actually visiting our site monthly to inspect quality. They catch small issues before we even notice them. This level of proactive service is rare in the cleaning industry.',
    name: 'David Chen',
    title: 'VP of Operations',
    company: 'Pioneer Manufacturing',
    industry: 'Manufacturing',
    service: 'Janitorial Services',
    rating: 5,
    date: '2024-05-25',
  },
  {
    id: '10',
    quote:
      "Our medical practice requires strict HIPAA compliance and biohazard handling. Anderson's team is trained on all protocols, uses proper PPE, and follows our specific procedures to the letter. Finally, a cleaning company that understands healthcare.",
    name: 'Dr. Emily Rodriguez',
    title: 'Chief Medical Officer',
    company: 'Northampton Health Clinic',
    industry: 'Medical',
    service: 'Medical Facility Cleaning',
    rating: 5,
    date: '2024-04-18',
  },
  {
    id: '11',
    quote:
      'Fair pricing, reliable service, and genuine care. Anderson Cleaning treats our small non-profit office with the same attention they give to their larger clients. That speaks volumes about their character.',
    name: 'Rachel Greene',
    title: 'Executive Director',
    company: 'Community Action Network',
    industry: 'Office',
    service: 'Office Cleaning',
    rating: 5,
    date: '2024-03-12',
  },
  {
    id: '12',
    quote:
      "We've used Anderson for window cleaning on our 4-story office building for 3 years. Their team is safety-certified, insured, and always delivers streak-free results. Highly recommend for high-rise work.",
    name: 'Brian Sullivan',
    title: 'Building Manager',
    company: 'Springfield Tower Complex',
    industry: 'Property Management',
    service: 'Window Cleaning',
    rating: 4,
    date: '2024-02-08',
  },
]

export default function TestimonialsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All')
  const [selectedService, setSelectedService] = useState<string>('All')

  // Get unique industries and services for filters
  const industries = ['All', ...Array.from(new Set(testimonials.map((t) => t.industry)))]
  const services = ['All', ...Array.from(new Set(testimonials.map((t) => t.service)))]

  // Filter testimonials
  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesIndustry = selectedIndustry === 'All' || testimonial.industry === selectedIndustry
    const matchesService = selectedService === 'All' || testimonial.service === selectedService
    return matchesIndustry && matchesService
  })

  // Calculate average rating
  const averageRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  ).toFixed(1)

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
            }`}
          />
        ))}
      </div>
    )
  }

  // JSON-LD Schema for Review Aggregate
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Anderson Cleaning',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      reviewCount: testimonials.length,
      bestRating: '5',
      worstRating: '1',
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.rating.toString(),
        bestRating: '5',
      },
      reviewBody: t.quote,
      datePublished: t.date,
    })),
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/30 rounded-full px-6 py-2 mb-6">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-yellow-100 font-semibold">
              {averageRating}/5 stars from {testimonials.length} clients
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Client Testimonials</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Don't just take our word for it. Here's what our clients have to say about Anderson
            Cleaning's professional commercial cleaning services.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
            onClick={() =>
              window.open('https://www.google.com/search?q=Anderson+Cleaning+reviews', '_blank')
            }
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Read & Leave a Google Review
          </Button>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Filter Testimonials
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Industry
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry === 'All' ? 'All Industries' : industry}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service === 'All' ? 'All Services' : service}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {(selectedIndustry !== 'All' || selectedService !== 'All') && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredTestimonials.length} of {testimonials.length} testimonials
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {filteredTestimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  No testimonials match your filter criteria. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                  >
                    {/* Rating */}
                    <div className="mb-4">{renderStars(testimonial.rating)}</div>

                    {/* Quote */}
                    <blockquote className="flex-1 mb-6">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                        "{testimonial.quote}"
                      </p>
                    </blockquote>

                    {/* Author Info */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="font-bold text-gray-900 dark:text-gray-100">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.company}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                          {testimonial.industry}
                        </span>
                        <span className="inline-block px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-xs font-medium rounded-full">
                          {testimonial.service}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Anderson Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join dozens of satisfied clients across Massachusetts and Connecticut who trust Anderson
            Cleaning with their facilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" onClick={() => (window.location.href = '/quote')}>
              Get Your Free Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
              onClick={() =>
                window.open('https://www.google.com/search?q=Anderson+Cleaning+reviews', '_blank')
              }
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Leave a Review
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
