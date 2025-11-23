'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import QuoteMiniForm from '@/components/forms/QuoteMiniForm'
import QuoteAdvancedModal from '@/components/forms/QuoteAdvancedModal'
import BeforeAfterSlider from '@/components/sections/BeforeAfterSlider'
import StatsBar from '@/components/sections/StatsBar'
import PromotionalModal from '@/components/PromotionalModal'
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock,
  HardHat,
  Headphones,
  HelpCircle,
  MapPin,
  Package,
  Phone,
  Shield,
  Sparkles,
  Square,
  Star,
  Users,
  Zap,
  Gift,
} from 'lucide-react'

export default function Home() {
  const [showAdvancedModal, setShowAdvancedModal] = useState(false)
  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900 transition-colors duration-300">
      {/* Promotional Modal */}
      <PromotionalModal />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-deep-blue via-brand-navy to-brand-bright-blue text-white py-20 md:py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full border border-brand-bright-blue/40 bg-brand-bright-blue/10 text-brand-bright-blue text-sm font-medium">
                Trusted by 100+ Businesses Since 2007
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Professional Commercial Cleaning You Can Count On
            </h1>

            {/* Supporting Line */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Full-time salaried teams, 24/7 support, and corporate-grade standards for your Western MA & Northern CT facility
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/quote">
                <Button variant="accent" size="lg" className="min-w-[220px]">
                  Get a Free Quote
                </Button>
              </Link>
              <a href="tel:+14133065053">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[220px] border-2 border-white text-white hover:bg-white/10"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call (413) 306-5053
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <StatsBar background="gray" className="border-y border-neutral-light-grey/70" />

      {/* Services Overview Section */}
      <section id="services" className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80 max-w-2xl mx-auto">
              Comprehensive commercial cleaning solutions tailored to your facility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Office & Commercial Cleaning',
                description: 'Daily/weekly programs for spotless workplaces',
                icon: Building2,
                label: 'Office building icon',
                available: true,
              },
              {
                title: 'Janitorial Services',
                description: 'Reliable, accountable facility care',
                icon: Sparkles,
                label: 'Janitorial icon',
                available: true,
              },
              {
                title: 'Floor & Carpet Care',
                description: 'Strip, wax, buff, and deep cleaning',
                icon: Zap,
                label: 'Floor care icon',
                available: false,
              },
              {
                title: 'Window Cleaning',
                description: 'Interior & exterior, streak-free results',
                icon: Square,
                label: 'Window cleaning icon',
                available: false,
              },
              {
                title: 'Post-Construction',
                description: 'Move-in ready cleanup after renovations',
                icon: HardHat,
                label: 'Construction icon',
                available: false,
              },
              {
                title: 'Supply Management',
                description: 'Auto-replenishment of consumables',
                icon: Package,
                label: 'Supply management icon',
                available: false,
              },
            ].map((service, i) => {
              const Icon = service.icon
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 border-2 border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 shadow-sm hover:-translate-y-1 hover:border-brand-bright-blue transition-all duration-300 min-h-[190px] flex"
                >
                  <div className="flex items-start space-x-4 w-full">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-off-white text-brand-bright-blue">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                      <span className="sr-only">{service.label}</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-body text-neutral-charcoal/80 dark:text-white/80 mb-3">
                          {service.description}
                        </p>
                      </div>
                      {!service.available && (
                        <span className="inline-block px-3 py-1 text-body-sm rounded-full bg-neutral-off-white text-brand-navy dark:bg-slate-800 dark:text-white">
                          Premium add-on
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button variant="primary" size="lg">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Coverage Area Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
                Serving Massachusetts & Connecticut
              </h2>
              <p className="text-body text-neutral-charcoal/70 dark:text-white/80">
                Within 100 miles of West Springfield, MA
              </p>
            </div>

            <div className="bg-neutral-off-white dark:bg-slate-800 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-4 flex items-center">
                    <MapPin className="h-6 w-6 text-brand-navy dark:text-brand-bright-blue mr-2" />
                    Primary Service Areas
                  </h3>
                  <ul className="space-y-2 text-body text-neutral-charcoal/80 dark:text-white/80">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Springfield & West Springfield
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Worcester County
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Northampton & Amherst
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Hartford, CT area
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-4 flex items-center">
                    <Building2 className="h-6 w-6 text-brand-navy dark:text-brand-bright-blue mr-2" />
                    We Serve
                  </h3>
                  <ul className="space-y-2 text-body text-neutral-charcoal/80 dark:text-white/80">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Office buildings & corporate campuses
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Medical offices & clinics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Educational facilities & schools
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Retail stores & warehouses
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-brand-navy text-white rounded-lg p-6">
              <p className="text-body leading-relaxed text-white/90">
                <strong>Note:</strong> We focus exclusively on B2B commercial cleaning. We do not
                service restaurants or facilities requiring 7-day/week cleaning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center space-x-1 mb-2" role="img" aria-label="5 out of 5 stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 text-brand-bright-blue fill-brand-bright-blue" aria-hidden="true" />
              ))}
            </div>
            <p className="text-body text-neutral-charcoal/80 dark:text-white/70">5.0 stars from satisfied clients</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'Anderson Cleaning transformed our medical office. Their attention to detail and OSHA compliance gives us complete peace of mind.',
                author: 'Dr. Sarah Mitchell',
                company: 'Springfield Family Medicine',
                rating: 5,
              },
              {
                quote:
                  "We've tried three cleaning companies before Anderson. The difference is night and day. Their team is professional, consistent, and truly cares.",
                author: 'Michael Chen',
                company: 'TechStart Solutions',
                rating: 5,
              },
              {
                quote:
                  "The 24/7 support isn't just marketing – they really do respond in minutes. When we had an emergency spill, they had someone there within the hour.",
                author: 'Jennifer Rodriguez',
                company: 'Northeast Manufacturing',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center space-x-1 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 text-brand-bright-blue fill-brand-bright-blue" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-body leading-relaxed text-neutral-charcoal dark:text-white mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-neutral-light-grey dark:border-slate-700 pt-4">
                  <p className="font-semibold text-neutral-charcoal dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-body-sm text-neutral-charcoal/70 dark:text-white/80">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Proof - Before & After */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
              Our Work Speaks for Itself
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80 mb-8">
              See the Anderson Cleaning difference with interactive before/after comparisons
            </p>
          </div>

          <BeforeAfterSlider
            items={[
              {
                beforeImage:
                  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
                afterImage:
                  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
                beforeLabel: 'Before',
                afterLabel: 'After',
                title: 'Spotless Floors',
                description:
                  'Professional strip, wax, and buff services that restore shine and extend floor life',
              },
              {
                beforeImage:
                  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
                afterImage:
                  'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80',
                beforeLabel: 'Before',
                afterLabel: 'After',
                title: 'Sanitized Spaces',
                description: 'Healthcare-grade disinfection that meets OSHA and CDC standards',
              },
            ]}
            height="h-[500px]"
          />
        </div>
      </section>

      {/* Certifications & Trust Badges */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
              Licensed, Certified & Trusted
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80">
              We meet the highest industry standards
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { icon: Shield, label: 'Licensed & Insured', desc: 'Full liability coverage' },
              { icon: Users, label: 'Background Checked', desc: 'All staff verified' },
              {
                icon: Award,
                label: '18 Years of Excellence',
                desc: 'Serving Western MA & Northern CT Since 2007',
              },
              { icon: Star, label: '100% Satisfaction', desc: 'Guaranteed results' },
              { icon: CheckCircle2, label: 'OSHA Compliant', desc: 'Safety trained' },
              { icon: Sparkles, label: 'Eco-Friendly', desc: 'Green cleaning' },
              { icon: Clock, label: '24/7 Support', desc: 'Current clients on-site ≤2 hrs' },
              { icon: Building2, label: 'B2B Focused', desc: 'Commercial only' },
            ].map((badge, i) => {
              const Icon = badge.icon
              return (
                <div
                  key={i}
                  className="bg-neutral-off-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 text-center shadow-sm"
                >
                  <Icon className="h-12 w-12 text-brand-navy dark:text-brand-bright-blue mx-auto mb-3" />
                  <h3 className="font-bold text-neutral-charcoal dark:text-white mb-1 text-body-sm">
                    {badge.label}
                  </h3>
                  <p className="text-body-sm text-neutral-charcoal/70 dark:text-white/80">{badge.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-3xl mx-auto border border-neutral-light-grey dark:border-slate-700 shadow-sm">
            <div className="text-center mb-6">
              <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-2">
                Our Commitment to You
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                <span className="text-body text-neutral-charcoal/80 dark:text-white/80">
                  Bonded & insured for your protection
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                <span className="text-body text-neutral-charcoal/80 dark:text-white/80">
                  Full-time W2 employees only
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                <span className="text-body text-neutral-charcoal/80 dark:text-white/80">
                  40+ hours of training per cleaner
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                <span className="text-body text-neutral-charcoal/80 dark:text-white/80">
                  Quality audits & checklists
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                <span className="text-body text-neutral-charcoal/80 dark:text-white/80">
                  EPA-registered disinfectants
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                <span className="text-body text-neutral-charcoal/80 dark:text-white/80">
                  Custom SOPs for your facility
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Learning Center */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
              Resources & Learning Center
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80">
              Expert tips, answers to your questions, and special offers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog/Resources Card */}
            <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl shadow-sm overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="bg-brand-navy p-6 text-white">
                <BookOpen className="h-8 w-8 mb-3" aria-hidden="true" />
                <h3 className="text-h3 font-bold mb-2">Blog & Resources</h3>
                <p className="text-body text-white/80">Expert cleaning tips and industry insights</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-body text-neutral-charcoal dark:text-white">
                      Office Cleaning Best Practices
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-body text-neutral-charcoal dark:text-white">
                      Green Cleaning Benefits
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-body text-neutral-charcoal dark:text-white">
                      Healthcare Facility Standards
                    </span>
                  </li>
                </ul>
                <Link href="/blog">
                  <Button variant="primary" className="w-full group">
                    Explore Articles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* FAQ Card */}
            <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl shadow-sm overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="bg-brand-bright-blue p-6 text-white">
                <HelpCircle className="h-8 w-8 mb-3" aria-hidden="true" />
                <h3 className="text-h3 font-bold mb-2">Frequently Asked Questions</h3>
                <p className="text-body text-white/80">Get answers to common questions</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-body text-neutral-charcoal dark:text-white">Contract & Pricing Info</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-body text-neutral-charcoal dark:text-white">
                      Staff Vetting & Training
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-body text-neutral-charcoal dark:text-white">
                      Service Area & Scheduling
                    </span>
                  </li>
                </ul>
                <Link href="/faq">
                  <Button variant="primary" className="w-full group">
                    View All FAQs
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Promotions Card */}
            <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl shadow-sm overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="bg-brand-navy p-6 text-white">
                <Gift className="h-8 w-8 mb-3" aria-hidden="true" />
                <h3 className="text-h3 font-bold mb-2">Special Offers</h3>
                <p className="text-body text-white/80">Exclusive promotions and referral rewards</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-body text-neutral-charcoal dark:text-white">
                      10% Off First Month for New Clients
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-body text-neutral-charcoal dark:text-white">
                      $100 Referral Bonus Program
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-body text-neutral-charcoal dark:text-white">
                      Seasonal Promotions
                    </span>
                  </li>
                </ul>
                <Link href="/promotions">
                  <Button variant="accent" className="w-full group">
                    See All Offers
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
              The Anderson Difference
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80">
              What sets us apart in commercial cleaning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'Personalized Attention',
                description: 'Local team, dedicated account manager, and site-specific SOPs.',
              },
              {
                icon: Shield,
                title: 'Corporate-Grade Standards',
                description: 'Checklists, quality audits, and documented processes.',
              },
              {
                icon: Award,
                title: 'Full-Time Salaried Staff',
                description: 'Stable, trained, background-checked professionals.',
              },
              {
                icon: Headphones,
                title: '24/7 Support',
                description: 'Current clients get emergency dispatch with on-site arrival in ≤2 hours.',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-brand-navy/10 text-brand-navy dark:bg-white/10 dark:text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-body text-neutral-charcoal/80 dark:text-white/80">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <QuoteAdvancedModal
        isOpen={showAdvancedModal}
        onClose={() => setShowAdvancedModal(false)}
      />
    </div>
  )
}
