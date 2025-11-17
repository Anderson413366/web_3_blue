'use client'

import React from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { Star } from 'lucide-react'

const EmployeeStoriesSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { t } = context

  const testimonialsData = t('employeeTestimonials')
  const testimonials = Array.isArray(testimonialsData)
    ? (testimonialsData as unknown as {
        name: string
        position: string
        quote: string
        image?: string
      }[])
    : []

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('employeeStoriesTitle') as string}
          </h2>
          <div className="flex items-center justify-center space-x-1 mb-2" role="img" aria-label="5 out of 5 stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-6 w-6 text-accent-500 fill-accent-500" aria-hidden="true" />
            ))}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('employeeStoriesSubtitle') as string}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-md">
              <div className="flex items-center space-x-1 mb-4" role="img" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-accent-500 fill-accent-500" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmployeeStoriesSection
