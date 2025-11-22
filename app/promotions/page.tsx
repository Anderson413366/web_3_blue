'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Gift, Users, DollarSign, CheckCircle2, ArrowRight, Sparkles, Calendar, Award } from 'lucide-react'

export default function PromotionsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-navy text-white pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <Gift className="h-16 w-16 text-accent-400 mx-auto" />
            </div>
            <h1 className="text-h1 leading-tight font-extrabold mb-6 leading-tight">
              Special Offers & Referral Program
            </h1>
            <p className="text-body text-white/80 leading-relaxed">
              Save on professional commercial cleaning services and earn rewards for referring other
              businesses!
            </p>
          </div>
        </div>
      </section>

      {/* Current Promotions */}
      <section className="py-16 bg-neutral-off-white dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
              Current Promotions
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80">
              Limited-time offers for new and existing clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* New Client Offer */}
            <div className="bg-brand-bright-blue rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-h3 font-bold mb-3">New Client Special</h3>
                <div className="text-h1 font-extrabold mb-4">10% OFF</div>
                <p className="text-body mb-6 text-white/80">
                  Your first month of regular cleaning services
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Valid for new contracts only</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Minimum 3-month commitment</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Cannot be combined with other offers</span>
                  </li>
                </ul>
                <Link href="/quote">
                  <Button
                    variant="accent"
                    size="lg"
                    className="w-full bg-white text-accent-600 hover:bg-neutral-light-grey"
                  >
                    Claim This Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <p className="text-xs text-white/80 mt-4 text-center">
                  Offer expires: December 31, 2024
                </p>
              </div>
            </div>

            {/* Seasonal Deep Clean */}
            <div className="bg-brand-navy rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-h3 font-bold mb-3">Spring Deep Clean</h3>
                <div className="text-h1 font-extrabold mb-4">$200 OFF</div>
                <p className="text-body mb-6 text-white/80">
                  One-time deep cleaning service (10,000+ sq ft)
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Floor stripping, waxing & buffing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Carpet deep cleaning included</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>All high-touch surface disinfection</span>
                  </li>
                </ul>
                <Link href="/quote">
                  <Button
                    variant="accent"
                    size="lg"
                    className="w-full bg-white text-primary-600 hover:bg-neutral-light-grey"
                  >
                    Get a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <p className="text-xs text-white/80 mt-4 text-center">
                  Valid for facilities 10,000 sq ft or larger
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-bright-blue rounded-full mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
                Referral Rewards Program
              </h2>
              <p className="text-body text-neutral-charcoal/70 dark:text-white/80 max-w-2xl mx-auto">
                Love our service? Share the cleanliness! Earn rewards for every business you refer to
                Anderson Cleaning.
              </p>
            </div>

            {/* How It Works */}
            <div className="bg-neutral-off-white dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 md:p-12 mb-12">
              <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-8 text-center">
                How It Works
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-h3 font-bold mb-4">
                    1
                  </div>
                  <h4 className="text-body font-bold text-neutral-charcoal dark:text-white mb-2">
                    Refer a Business
                  </h4>
                  <p className="text-neutral-charcoal/80 dark:text-white/80">
                    Tell another business owner about Anderson Cleaning. Use our simple referral form
                    or have them mention your name.
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-h3 font-bold mb-4">
                    2
                  </div>
                  <h4 className="text-body font-bold text-neutral-charcoal dark:text-white mb-2">
                    They Sign Up
                  </h4>
                  <p className="text-neutral-charcoal/80 dark:text-white/80">
                    Your referral signs a contract for regular cleaning services (minimum 3-month
                    commitment required).
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-600 text-white rounded-full text-h3 font-bold mb-4">
                    3
                  </div>
                  <h4 className="text-body font-bold text-neutral-charcoal dark:text-white mb-2">
                    You Both Save!
                  </h4>
                  <p className="text-neutral-charcoal/80 dark:text-white/80">
                    You receive $100 credit, and your referral gets $50 off their first month. It's a
                    win-win!
                  </p>
                </div>
              </div>
            </div>

            {/* Referral Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border-2 border-accent-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center mr-4">
                    <DollarSign className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white">
                    For You (Referrer)
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>$100 credit</strong> applied to your next invoice
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>Unlimited referrals</strong> - no cap on rewards
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      Credits never expire while you're a client
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      Stackable credits for multiple referrals
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border-2 border-primary-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white">
                    For Your Referral
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>$50 off</strong> their first month of service
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      Priority scheduling and onboarding
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      Free walk-through and customized quote
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      Same trusted service you recommend
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Referral Form CTA */}
            <div className="bg-brand-navy rounded-2xl p-8 md:p-12 text-white text-center">
              <h3 className="text-h2 font-bold mb-4">Ready to Refer?</h3>
              <p className="text-body text-white/80 mb-8 max-w-2xl mx-auto">
                Submit a referral today and start earning rewards. Your friend gets a great cleaning
                service, and you save money—everybody wins!
              </p>
              <Link href="/contact?subject=referral">
                <Button variant="accent" size="lg" className="mr-4 mb-4">
                  Submit a Referral
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/quote">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 mb-4"
                >
                  Get a Quote First
                </Button>
              </Link>
            </div>

            {/* Terms & Conditions */}
            <div className="mt-12 bg-neutral-light-grey dark:bg-slate-800 rounded-lg p-6">
              <h4 className="text-body font-bold text-neutral-charcoal dark:text-white mb-4">
                Program Terms & Conditions
              </h4>
              <ul className="space-y-2 text-sm text-neutral-charcoal/80 dark:text-white/80">
                <li>• Referral must be a new client who has not previously worked with Anderson Cleaning</li>
                <li>• Minimum 3-month contract required to qualify for referral rewards</li>
                <li>• Referral credits applied after referred client completes their first month of service</li>
                <li>• Credits are non-transferable and have no cash value</li>
                <li>• Referrer must be a current Anderson Cleaning client in good standing</li>
                <li>• Anderson Cleaning reserves the right to modify or discontinue the referral program at any time</li>
                <li>• Cannot be combined with other promotional offers unless explicitly stated</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA */}
      <section className="py-16 bg-neutral-off-white dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-6">
              Questions About Our Offers?
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80 mb-8">
              Contact us to learn more about current promotions, referral rewards, or to get a custom
              quote for your facility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Contact Us
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="outline" size="lg">
                  View FAQs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
