'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import {
  Package,
  TrendingDown,
  ClipboardList,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  DollarSign,
  Clock,
  ShoppingCart,
  Truck,
} from 'lucide-react'

export default function SupplyManagementPage() {
  const router = useRouter()

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Supply Management Service',
    description:
      'Comprehensive inventory management for commercial facility consumables including paper products, soap, and cleaning supplies',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Anderson Cleaning',
    },
    serviceType: 'Supply Management',
    areaServed: {
      '@type': 'State',
      name: 'Massachusetts',
    },
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-medium mb-6">
              Available to Contracted Cleaning Clients Only
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Never Run Out Again</h1>
            <p className="text-xl text-blue-100 mb-4">
              Comprehensive supply management that eliminates stockouts, reduces costs, and frees up
              your time.
            </p>
            <p className="text-lg text-blue-200 mb-8">
              We track, forecast, and automatically replenish toilet paper, paper towels, soap,
              trash liners, and all facility consumables.
            </p>

            <Button variant="accent" size="lg" onClick={() => router.push('/contact')}>
              Add to Your Account
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              How Our Inventory System Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Automated tracking and replenishment with zero effort on your part
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: ClipboardList,
                step: '1',
                title: 'Initial Assessment',
                description:
                  'We audit your current usage, storage capacity, and identify all consumable needs.',
              },
              {
                icon: BarChart3,
                step: '2',
                title: 'Set Par Levels',
                description:
                  'Establish minimum quantities for each item that trigger automatic reorders.',
              },
              {
                icon: Calendar,
                step: '3',
                title: 'Regular Monitoring',
                description:
                  'Our cleaning team checks inventory during each visit and tracks usage patterns.',
              },
              {
                icon: Truck,
                step: '4',
                title: 'Auto-Replenishment',
                description:
                  "Supplies delivered before you run out. You approve the first order, then it's automatic.",
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="relative bg-gradient-to-br from-primary-50 to-accent-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-md text-center"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                  <Icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4 mt-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
              Supplies We Manage
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <Package className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
                  Restroom Supplies
                </h3>
                <ul className="space-y-3">
                  {[
                    'Toilet paper (all grades)',
                    'Paper towels (standard, jumbo, or multi-fold)',
                    'Hand soap (liquid, foam, or bar)',
                    'Hand sanitizer',
                    'Seat covers',
                    'Feminine hygiene products',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <ShoppingCart className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
                  Facility Supplies
                </h3>
                <ul className="space-y-3">
                  {[
                    'Trash can liners (all sizes)',
                    'Facial tissue boxes',
                    'Kitchen supplies (dish soap, sponges)',
                    'Air fresheners',
                    'Cleaning supplies (for your staff)',
                    'Custom items upon request',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cadence & Forecasting */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
              Inventory Cadence & Reporting
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Calendar,
                  title: 'Weekly/Bi-Weekly Checks',
                  description:
                    'Our cleaning team inventories supplies during regular service visits. You choose the frequency.',
                },
                {
                  icon: BarChart3,
                  title: 'Usage Forecasting',
                  description:
                    "We track consumption patterns and predict when you'll need reorders, preventing stockouts.",
                },
                {
                  icon: FileText,
                  title: 'Monthly Reports',
                  description:
                    'Detailed usage reports show consumption trends, costs, and opportunities for savings.',
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 text-center">
                    <Icon className="h-12 w-12 text-accent-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
              Why Add Supply Management?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Clock,
                  title: 'Save Time',
                  description:
                    'Stop running to the store or placing emergency orders. We handle everything.',
                },
                {
                  icon: DollarSign,
                  title: 'Reduce Costs',
                  description:
                    'Bulk purchasing power and elimination of emergency orders save 15-25% on average.',
                },
                {
                  icon: TrendingDown,
                  title: 'Prevent Stockouts',
                  description:
                    'Never run out of toilet paper, soap, or trash bags again. Guaranteed.',
                },
                {
                  icon: FileText,
                  title: 'One Invoice',
                  description:
                    'Supplies consolidated into your monthly cleaning invoice. Simplify accounting.',
                },
                {
                  icon: BarChart3,
                  title: 'Usage Insights',
                  description:
                    'Monthly reports help you understand consumption patterns and identify savings.',
                },
                {
                  icon: CheckCircle2,
                  title: 'Approved SKUs',
                  description:
                    'Choose your preferred brands or use our cost-effective alternatives.',
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md flex items-start gap-4"
                  >
                    <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              How Pricing Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12">
              Transparent pricing with no hidden fees
            </p>

            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 md:p-12 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <DollarSign className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Product Cost
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      You pay our cost for products (bulk purchasing means lower prices than retail)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Management Fee
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Small monthly fee covers inventory tracking, forecasting, and ordering
                      (typically $50-150/month depending on facility size)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <TrendingDown className="h-6 w-6 text-accent-600 dark:text-accent-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Typical Savings
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Most clients save 15-25% compared to their previous supply costs, even with
                      the management fee
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-600">
                <p className="text-center text-gray-700 dark:text-gray-300 font-medium">
                  Example: A 10,000 sq ft office typically spends $300-500/month on supplies + $75
                  management fee = $375-575/month total
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg p-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-8 w-8 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-300 mb-3">
                    Available to Contracted Cleaning Clients Only
                  </h3>
                  <p className="text-yellow-800 dark:text-yellow-200 mb-4">
                    Supply Management is exclusively available to facilities with an active Anderson
                    Cleaning service contract.
                  </p>
                  <p className="text-yellow-800 dark:text-yellow-200 mb-4">
                    <strong>Why?</strong> Our cleaning teams perform the inventory checks during
                    regular service visits. This ensures accurate tracking and allows us to
                    guarantee you'll never run out.
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Don't have cleaning service yet? No problem! Get a quote for our janitorial
                    services and add Supply Management at the same time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Eliminate Supply Headaches?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Add Supply Management to your cleaning contract and never worry about running out again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" onClick={() => router.push('/contact')}>
              Add to My Account
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
              onClick={() => router.push('/quote')}
            >
              Get Cleaning Service First
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
