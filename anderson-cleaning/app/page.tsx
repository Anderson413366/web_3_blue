'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BeforeAfterSlider from '@/components/sections/BeforeAfterSlider'
import {
  Phone,
  Clock,
  Shield,
  Users,
  Award,
  Headphones,
  MapPin,
  CheckCircle2,
  Building2,
  Star,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />

      {/* Hero Section with Quote Form */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Value Proposition */}
            <div>
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-accent-500/20 border border-accent-400/30 rounded-full text-accent-300 text-sm font-medium">
                  B2B Commercial Cleaning Experts
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Professional Commercial Cleaning with a{' '}
                <span className="text-accent-400">Personal Touch</span>
              </h1>

              {/* Key Selling Points */}
              <div className="space-y-3 mb-8 text-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-accent-400 flex-shrink-0 mt-1" />
                  <span className="text-blue-100">
                    Full-time salaried cleaners — stable, trained professionals
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-accent-400 flex-shrink-0 mt-1" />
                  <span className="text-blue-100">24/7 support with ≤30 minute response time</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-accent-400 flex-shrink-0 mt-1" />
                  <span className="text-blue-100">
                    Corporate-grade systems with small business care
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-accent-400 flex-shrink-0 mt-1" />
                  <span className="text-blue-100">
                    Licensed, insured & background-checked teams
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 text-sm mb-8">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-accent-400" aria-hidden="true" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-accent-400" aria-hidden="true" />
                  <span>20+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-accent-400" aria-hidden="true" />
                  <span>100% Satisfaction</span>
                </div>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="lg:hidden flex flex-col sm:flex-row gap-4">
                <Link href="/quote" className="flex-1">
                  <Button variant="accent" size="lg" className="w-full">
                    Get a Free Quote
                  </Button>
                </Link>
                <a href="tel:+15551234567" className="flex-1">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-white text-white hover:bg-white/10"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Column - Quick Quote Form */}
            <div className="hidden lg:block">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Get Your Free Quote
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Response in 30 minutes or less</p>
                </div>

                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="hero-name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      id="hero-name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hero-company"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Company Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      id="hero-company"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      placeholder="ABC Corp"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hero-phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Phone Number <span className="text-error">*</span>
                    </label>
                    <input
                      type="tel"
                      id="hero-phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hero-facility"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Facility Type <span className="text-error">*</span>
                    </label>
                    <select
                      id="hero-facility"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    >
                      <option value="">Select facility type</option>
                      <option>Office Building</option>
                      <option>Medical Office/Clinic</option>
                      <option>Educational Facility</option>
                      <option>Retail Store</option>
                      <option>Manufacturing/Warehouse</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-accent-500 hover:bg-accent-600 text-white"
                  >
                    Get My Free Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    We respond within 30 minutes • No obligations
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-slate-800 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive commercial cleaning solutions tailored to your facility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Office & Commercial Cleaning',
                description: 'Daily/weekly programs for spotless workplaces',
                icon: '🏢',
                available: true,
              },
              {
                title: 'Janitorial Services',
                description: 'Reliable, accountable facility care',
                icon: '🧹',
                available: true,
              },
              {
                title: 'Floor & Carpet Care',
                description: 'Strip, wax, buff, and deep cleaning',
                icon: '✨',
                available: false,
              },
              {
                title: 'Window Cleaning',
                description: 'Interior & exterior, streak-free results',
                icon: '🪟',
                available: false,
              },
              {
                title: 'Post-Construction',
                description: 'Move-in ready cleanup after renovations',
                icon: '🏗️',
                available: false,
              },
              {
                title: 'Supply Management',
                description: 'Auto-replenishment of consumables',
                icon: '📦',
                available: false,
              },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl flex-shrink-0">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {service.description}
                    </p>
                    {!service.available && (
                      <span className="inline-block px-2 py-1 bg-warning-light dark:bg-warning-dark/30 text-warning-dark dark:text-warning-light text-xs rounded">
                        Contracted clients only
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Serving Massachusetts & Connecticut
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Within 100 miles of West Springfield, MA
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
                    Primary Service Areas
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                      Springfield & West Springfield
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                      Worcester County
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                      Northampton & Amherst
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                      Hartford, CT area
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Building2 className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
                    We Serve
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                      Office buildings & corporate campuses
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                      Medical offices & clinics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                      Educational facilities & schools
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                      Retail stores & warehouses
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-info-light dark:bg-info-dark/20 border-l-4 border-info rounded-lg p-6">
              <p className="text-info-dark dark:text-info-light">
                <strong>Note:</strong> We focus exclusively on B2B commercial cleaning. We do not
                service restaurants or facilities requiring 7-day/week cleaning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 text-accent-500 fill-accent-500" />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400">5.0 stars from satisfied clients</p>
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
              <div key={i} className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-md">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 text-accent-500 fill-accent-500" />
                  ))}
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.company}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Work Speaks for Itself
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
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

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Want to see more examples of our work?
            </p>
            <Link href="/quote">
              <Button variant="primary" size="lg">
                Schedule a Walk-Through
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications & Trust Badges */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Licensed, Certified & Trusted
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We meet the highest industry standards
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { icon: Shield, label: 'Licensed & Insured', desc: 'Full liability coverage' },
              { icon: Users, label: 'Background Checked', desc: 'All staff verified' },
              { icon: Award, label: '20+ Years', desc: 'Industry experience' },
              { icon: Star, label: '100% Satisfaction', desc: 'Guaranteed results' },
              { icon: CheckCircle2, label: 'OSHA Compliant', desc: 'Safety trained' },
              { icon: Sparkles, label: 'Eco-Friendly', desc: 'Green cleaning' },
              { icon: Clock, label: '24/7 Support', desc: '≤30 min response' },
              { icon: Building2, label: 'B2B Focused', desc: 'Commercial only' },
            ].map((badge, i) => {
              const Icon = badge.icon
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-md text-center"
                >
                  <Icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">
                    {badge.label}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{badge.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-3xl mx-auto shadow-xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Our Commitment to You
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Bonded & insured for your protection
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Full-time W2 employees only
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  40+ hours of training per cleaner
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Quality audits & checklists
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  EPA-registered disinfectants
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Custom SOPs for your facility
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              The Anderson Difference
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
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
                description: 'We respond within 30 minutes—day or night.',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-blue-900/30 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary-700 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for a cleaner, healthier workplace?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your free, no-obligation quote today. We respond within 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg">
              Get Your Free Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
