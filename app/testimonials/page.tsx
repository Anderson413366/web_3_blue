
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Star, ExternalLink } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import TestimonialsExplorer from '@/components/testimonials/TestimonialsExplorer'
import { Testimonial } from '@/lib/testimonials/types'

export const revalidate = 86400

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
  const averageRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  ).toFixed(1)

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
      <StructuredData schema={jsonLd} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-brand-navy text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/30 rounded-full px-6 py-2 mb-6">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-yellow-100 font-semibold">
              {averageRating}/5 stars from {testimonials.length} clients
            </span>
          </div>
          <h1 className="text-h1 md:text-h1 font-extrabold mb-6">Client Testimonials</h1>
          <p className="text-body text-white/80 max-w-3xl mx-auto mb-8">
            Don't just take our word for it. Here's what our clients have to say about Anderson
            Cleaning's professional commercial cleaning services.
          </p>
          <a
            href="https://www.google.com/search?q=Anderson+Cleaning+reviews"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <ExternalLink className="h-5 w-5 mr-2" />
              Read & Leave a Google Review
            </Button>
          </a>
        </div>
      </section>

      <TestimonialsExplorer testimonials={testimonials} />

      {/* CTA Section */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-h2 leading-tight font-bold mb-6">
            Ready to Experience the Anderson Difference?
          </h2>
          <p className="text-body text-white/80 max-w-2xl mx-auto">
            Join dozens of satisfied clients across Massachusetts and Connecticut who trust Anderson
            Cleaning with their facilities.
          </p>
        </div>
      </section>
    </div>
  )
}
