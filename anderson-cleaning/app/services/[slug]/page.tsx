'use client'

import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, ArrowLeft, Clock, Shield, Users, Award } from 'lucide-react'

// Service data structure
interface ServiceData {
  title: string
  icon: string
  tagline: string
  heroDescription: string
  availability: 'all' | 'contracted'
  benefits: string[]
  process: { step: number; title: string; description: string }[]
  included: string[]
  pricing: { factor: string; description: string }[]
  faqs: { question: string; answer: string }[]
}

// Service content database
const servicesData: Record<string, ServiceData> = {
  'office-cleaning': {
    title: 'Office & Commercial Cleaning',
    icon: '🏢',
    tagline: 'Keep your workplace spotless and productive',
    heroDescription:
      'Professional daily and weekly cleaning programs designed for office buildings, corporate campuses, and business centers. We maintain a clean, healthy environment that keeps your team productive and impresses your clients.',
    availability: 'all',
    benefits: [
      'Daily or weekly cleaning schedules customized to your needs',
      'Nightly service to avoid disrupting your business',
      'All cleaning supplies and equipment included',
      'Dedicated cleaning teams for consistency',
      'Quality inspections and corrective action plans',
      'Professional appearance for clients and employees',
    ],
    process: [
      {
        step: 1,
        title: 'Free Facility Walk-Through',
        description:
          'We tour your office to understand layout, high-traffic areas, and special requirements.',
      },
      {
        step: 2,
        title: 'Custom Cleaning Plan',
        description:
          'We create detailed SOPs (Standard Operating Procedures) specific to your space.',
      },
      {
        step: 3,
        title: 'Team Training',
        description:
          'Our staff learns your facility layout, access procedures, and cleaning priorities.',
      },
      {
        step: 4,
        title: 'Supervised Start',
        description:
          'First week includes extra supervision to ensure quality meets your standards.',
      },
      {
        step: 5,
        title: 'Ongoing Quality Audits',
        description: 'Regular inspections and immediate corrective action for any issues.',
      },
    ],
    included: [
      'Empty trash and recycling bins',
      'Vacuum carpets and mop hard floors',
      'Clean and sanitize restrooms',
      'Wipe down desks, tables, and countertops',
      'Clean break rooms and kitchens',
      'Dust surfaces, windowsills, and baseboards',
      'Spot clean walls and doors',
      'Clean mirrors and glass surfaces',
      'Restock paper products and soap',
      'Maintain supply inventory',
    ],
    pricing: [
      { factor: 'Square Footage', description: 'Total cleanable area of your facility' },
      { factor: 'Cleaning Frequency', description: 'Daily, 3x/week, weekly, etc.' },
      {
        factor: 'Facility Complexity',
        description: 'Number of restrooms, conference rooms, special areas',
      },
      { factor: 'Service Hours', description: 'Evening, overnight, or weekend cleaning' },
    ],
    faqs: [
      {
        question: 'Do you clean during business hours or after hours?',
        answer:
          'Most office cleaning happens after business hours (evenings or weekends) to avoid disrupting your team. However, we can provide day porter services for high-traffic areas if needed.',
      },
      {
        question: 'What if we need cleaning on a specific day?',
        answer:
          'We customize schedules to your needs. Whether you need daily cleaning, specific days of the week, or just before important meetings, we can accommodate.',
      },
      {
        question: 'Do you provide your own cleaning supplies?',
        answer:
          'Yes! All cleaning supplies, equipment, and paper products are included in our service. We use professional-grade, EPA-approved products.',
      },
      {
        question: 'What if something is missed during cleaning?',
        answer:
          'Call or email us anytime. We respond within 30 minutes and send someone back to address the issue the same day or within 24 hours.',
      },
    ],
  },
  janitorial: {
    title: 'Janitorial Services',
    icon: '🧹',
    tagline: 'Reliable, consistent facility care',
    heroDescription:
      'Comprehensive janitorial programs for commercial facilities requiring dependable, accountable cleaning teams. Perfect for facilities that need more than basic cleaning-they need a partner.',
    availability: 'all',
    benefits: [
      'Full-time, salaried cleaning professionals',
      'Consistent teams assigned to your facility',
      'Comprehensive facility care programs',
      'Quality checklists and documentation',
      'Regular performance audits',
      '24/7 emergency response available',
    ],
    process: [
      {
        step: 1,
        title: 'Facility Assessment',
        description: 'In-depth evaluation of your facility, traffic patterns, and risk areas.',
      },
      {
        step: 2,
        title: 'Create Custom SOPs',
        description: 'Detailed procedures for every area of your facility.',
      },
      {
        step: 3,
        title: 'Assign Dedicated Team',
        description: 'Same cleaning team every visit for consistency and accountability.',
      },
      {
        step: 4,
        title: 'Quality Control System',
        description: 'Checklists, inspections, and corrective action protocols.',
      },
      {
        step: 5,
        title: 'Continuous Improvement',
        description: 'Regular reviews and adjustments based on your feedback.',
      },
    ],
    included: [
      'All standard office cleaning services',
      'Detailed cleaning checklists',
      'Quality control inspections',
      'Dedicated account manager',
      'Emergency response protocol',
      'Staff training and supervision',
      'Customized service schedules',
      'Regular progress reports',
    ],
    pricing: [
      { factor: 'Facility Size', description: 'Total square footage and complexity' },
      { factor: 'Service Level', description: 'Standard, enhanced, or premium cleaning' },
      { factor: 'Staff Requirements', description: 'Number of team members needed' },
      { factor: 'Management Needs', description: 'Level of oversight and reporting required' },
    ],
    faqs: [
      {
        question: 'How is janitorial service different from office cleaning?',
        answer:
          'Janitorial service includes comprehensive facility management with dedicated teams, quality control systems, detailed SOPs, and account management. Office cleaning focuses on core cleaning tasks.',
      },
      {
        question: 'Do we get the same cleaning team every time?',
        answer:
          "Yes! Consistency is core to our janitorial service. You'll have the same team members who learn your facility and preferences.",
      },
      {
        question: 'What kind of reporting do you provide?',
        answer:
          'We provide cleaning checklists, quality inspection reports, and regular progress updates. We can customize reporting to your needs.',
      },
    ],
  },
  'floor-carpet-care': {
    title: 'Floor & Carpet Care',
    icon: '✨',
    tagline: 'Extend the life and look of your floors',
    heroDescription:
      'Professional floor maintenance programs including strip & wax, carpet cleaning, buffing, and stain removal. Protect your flooring investment and maintain a professional appearance.',
    availability: 'contracted',
    benefits: [
      'Professional strip, wax, and buffing services',
      'Deep carpet extraction cleaning',
      'Stain and spot removal',
      'Floor restoration and protection',
      'Scheduled maintenance programs',
      'Extends floor life by years',
    ],
    process: [
      {
        step: 1,
        title: 'Floor Assessment',
        description: 'Evaluate floor type, condition, and maintenance history.',
      },
      {
        step: 2,
        title: 'Recommend Program',
        description: 'Suggest appropriate services and frequency based on traffic.',
      },
      {
        step: 3,
        title: 'Schedule Service',
        description: 'Coordinate timing to minimize disruption to your business.',
      },
      {
        step: 4,
        title: 'Professional Application',
        description: 'Use commercial-grade equipment and products for best results.',
      },
      {
        step: 5,
        title: 'Maintenance Plan',
        description: 'Create ongoing schedule to keep floors looking their best.',
      },
    ],
    included: [
      'Strip old wax and buildup',
      'Deep clean floor surface',
      'Apply multiple coats of finish',
      'Buff to high shine',
      'Carpet pre-treatment',
      'Hot water extraction',
      'Spot and stain removal',
      'Deodorizing treatment',
      'Fast-drying techniques',
    ],
    pricing: [
      { factor: 'Square Footage', description: 'Total floor area to be serviced' },
      { factor: 'Floor Type', description: 'VCT, tile, hardwood, carpet, etc.' },
      { factor: 'Floor Condition', description: 'Level of restoration needed' },
      { factor: 'Service Frequency', description: 'Quarterly, semi-annual, or annual' },
    ],
    faqs: [
      {
        question: 'How often should floors be stripped and waxed?',
        answer:
          'High-traffic areas: 2-4 times per year. Medium traffic: 1-2 times per year. Low traffic: Annually. We assess your specific needs during the walk-through.',
      },
      {
        question: 'How long does floor work take?',
        answer:
          'Strip and wax typically requires 8-12 hours including drying time. Carpet cleaning is usually 4-6 hours. We schedule during off-hours to minimize disruption.',
      },
      {
        question: 'Can I get floor care without regular cleaning service?',
        answer:
          'Floor care services are available to contracted cleaning clients only. This ensures we can properly schedule and resource the work.',
      },
    ],
  },
  'window-cleaning': {
    title: 'Window Cleaning',
    icon: '🪟',
    tagline: 'Streak-free shine for great first impressions',
    heroDescription:
      "Professional interior and exterior window cleaning for commercial buildings. Our certified teams deliver spotless, streak-free results that enhance your building's appearance.",
    availability: 'contracted',
    benefits: [
      'Interior and exterior window cleaning',
      'High-rise capability with safety equipment',
      'Streak-free, professional results',
      'Safety-certified technicians',
      'Frame and sill cleaning included',
      'Scheduled maintenance programs',
    ],
    process: [
      {
        step: 1,
        title: 'Site Survey',
        description: 'Assess window access, height, and safety requirements.',
      },
      {
        step: 2,
        title: 'Safety Planning',
        description: 'Plan equipment needs and safety protocols for your building.',
      },
      {
        step: 3,
        title: 'Schedule Service',
        description: 'Coordinate timing based on weather and your schedule.',
      },
      {
        step: 4,
        title: 'Professional Cleaning',
        description: 'Clean windows using professional squeegees and solutions.',
      },
      {
        step: 5,
        title: 'Final Inspection',
        description: 'Walk-through to ensure all windows are spotless.',
      },
    ],
    included: [
      'Interior window cleaning',
      'Exterior window cleaning',
      'Window frame cleaning',
      'Sill and track cleaning',
      'Screen removal and cleaning',
      'Spot-free drying',
      'Safety equipment and insurance',
      'Weather-appropriate scheduling',
    ],
    pricing: [
      { factor: 'Number of Windows', description: 'Total panes to be cleaned' },
      { factor: 'Window Height', description: 'Ground level, second floor, or high-rise' },
      { factor: 'Accessibility', description: 'Ease of access and safety equipment needed' },
      { factor: 'Service Frequency', description: 'Monthly, quarterly, or semi-annual' },
    ],
    faqs: [
      {
        question: 'Do you clean both inside and outside?',
        answer:
          'Yes! Most commercial window cleaning includes both interior and exterior surfaces for complete clarity.',
      },
      {
        question: 'What if it rains after you clean the windows?',
        answer:
          "Rain actually doesn't make clean windows dirty-only windows with existing dirt show rain spots. However, we'll return if you're not satisfied.",
      },
      {
        question: 'Can you clean high-rise windows?',
        answer:
          'Yes! Our teams are safety-certified and equipped for high-rise window cleaning. We follow all OSHA regulations and carry appropriate insurance.',
      },
    ],
  },
  'post-construction': {
    title: 'Post-Construction Cleanup',
    icon: '🏗️',
    tagline: 'Turnover-ready spaces after construction',
    heroDescription:
      'Detailed post-construction cleaning that removes dust, debris, and residue to deliver a move-in ready space. Perfect for new construction, renovations, and remodels.',
    availability: 'contracted',
    benefits: [
      'Complete debris and dust removal',
      'Detail cleaning of all surfaces',
      'Window and glass cleaning',
      'Floor cleaning and protection',
      'Move-in ready results',
      'Experienced construction cleanup teams',
    ],
    process: [
      {
        step: 1,
        title: 'Rough Clean',
        description: 'Remove construction debris, materials, and large dust accumulation.',
      },
      {
        step: 2,
        title: 'Detail Clean',
        description: 'Clean all surfaces, fixtures, windows, and floors thoroughly.',
      },
      {
        step: 3,
        title: 'Final Polish',
        description: 'Touch-up cleaning, final dusting, and polish to move-in condition.',
      },
      {
        step: 4,
        title: 'Final Walk-Through',
        description: 'Inspect with you to ensure every area meets standards.',
      },
      {
        step: 5,
        title: 'Touch-Up Service',
        description: 'Return for any final details after walk-through.',
      },
    ],
    included: [
      'Construction debris removal',
      'Dust removal from all surfaces',
      'Window and glass cleaning',
      'Floor cleaning and sealing prep',
      'Fixture and hardware cleaning',
      'Wall and baseboard cleaning',
      'Ceiling and vent cleaning',
      'Kitchen and bathroom detailing',
      'Final polish and touch-ups',
    ],
    pricing: [
      { factor: 'Square Footage', description: 'Total area to be cleaned' },
      {
        factor: 'Construction Type',
        description: 'Light remodel, heavy renovation, or new construction',
      },
      { factor: 'Debris Level', description: 'Amount of dust and debris present' },
      { factor: 'Timeline', description: 'Rush service vs. standard schedule' },
    ],
    faqs: [
      {
        question: 'When should post-construction cleaning happen?',
        answer:
          'Ideally after all construction work is complete but before move-in or final inspections. We can also do interim cleaning during longer projects.',
      },
      {
        question: 'Do you remove construction materials?',
        answer:
          "We remove cleaning-related debris and dust. Large construction materials, equipment, and dumpster items are the contractor's responsibility.",
      },
      {
        question: 'Can I get post-construction cleaning as a one-time service?',
        answer:
          'Post-construction cleaning is available to contracted clients only. This ensures proper scheduling and resource allocation.',
      },
    ],
  },
  'supply-management': {
    title: 'Supply Management',
    icon: '📦',
    tagline: 'Never run out of essentials again',
    heroDescription:
      'Comprehensive supply management for paper products, soap, and consumables. We track inventory, auto-replenish, and consolidate everything into one invoice.',
    availability: 'contracted',
    benefits: [
      'Never run out of paper towels, toilet paper, or soap',
      'Automatic inventory tracking and replenishment',
      'One consolidated invoice for all supplies',
      'Cost savings through bulk purchasing',
      'Reduced time spent managing supplies',
      'Eco-friendly product options available',
    ],
    process: [
      {
        step: 1,
        title: 'Initial Inventory',
        description: 'Assess current supply usage and storage capacity.',
      },
      {
        step: 2,
        title: 'Set Par Levels',
        description: 'Determine minimum quantities to trigger reorders.',
      },
      {
        step: 3,
        title: 'Setup Delivery Schedule',
        description: 'Establish regular delivery days and backup protocols.',
      },
      {
        step: 4,
        title: 'Ongoing Monitoring',
        description: 'Our team tracks usage during regular cleaning visits.',
      },
      {
        step: 5,
        title: 'Auto-Replenishment',
        description: 'Supplies delivered automatically before you run out.',
      },
    ],
    included: [
      'Toilet paper and paper towels',
      'Hand soap and sanitizer',
      'Trash can liners',
      'Facial tissue',
      'Cleaning supplies (for your staff)',
      'Kitchen supplies (dish soap, sponges)',
      'Air fresheners',
      'Inventory tracking system',
      'Consolidated monthly billing',
    ],
    pricing: [
      { factor: 'Facility Size', description: 'Number of restrooms and usage points' },
      { factor: 'Usage Volume', description: 'Number of employees and visitors' },
      { factor: 'Product Selection', description: 'Standard, premium, or eco-friendly products' },
      { factor: 'Delivery Frequency', description: 'Weekly, bi-weekly, or monthly' },
    ],
    faqs: [
      {
        question: 'How do you know when to restock supplies?',
        answer:
          'Our cleaning teams monitor inventory during regular visits and track usage patterns. When supplies hit predetermined par levels, we automatically reorder.',
      },
      {
        question: 'Can we choose our own product brands?',
        answer:
          'Yes! We can provide specific brands you prefer, or we can recommend cost-effective alternatives based on your needs.',
      },
      {
        question: 'How much does supply management cost?',
        answer:
          'You pay for the supplies plus a small management fee. Most clients save money through our bulk purchasing and reduced emergency orders.',
      },
    ],
  },
}

export default function ServiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const service = servicesData[slug]

  // JSON-LD Structured Data for SEO
  const jsonLd = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.heroDescription,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Anderson Cleaning',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '103 Wayside Avenue',
            addressLocality: 'West Springfield',
            addressRegion: 'MA',
            postalCode: '01089',
            addressCountry: 'US',
          },
          telephone: '+1-555-123-4567',
        },
        areaServed: {
          '@type': 'State',
          name: 'Massachusetts',
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'USD',
        },
      }
    : null

  // If service not found, show 404-like message
  if (!service) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Header />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Service Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The service you're looking for doesn't exist or has been moved.
          </p>
          <Button onClick={() => router.push('/services')}>View All Services</Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* JSON-LD for SEO */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-6">
          <button
            onClick={() => router.push('/services')}
            className="flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Services
          </button>

          <div className="flex items-start gap-6">
            <div className="text-7xl">{service.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{service.title}</h1>
              <p className="text-2xl text-accent-300 mb-4">{service.tagline}</p>
              <p className="text-xl text-blue-100 max-w-3xl">{service.heroDescription}</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Button variant="accent" size="lg" onClick={() => router.push('/quote')}>
              Get Your Free Quote
            </Button>
            {service.availability === 'contracted' && (
              <span className="inline-block px-4 py-2 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-medium">
                Available to Contracted Clients Only
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
            Why Choose Our {service.title}?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md flex items-start gap-3"
              >
                <CheckCircle2 className="h-6 w-6 text-accent-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
            Our Process
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Here's how we deliver exceptional {service.title.toLowerCase()}
          </p>

          <div className="max-w-4xl mx-auto space-y-6">
            {service.process.map((step, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-md flex items-start gap-6"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full text-xl font-bold flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
              What's Included
            </h2>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.included.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Factors Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
            Pricing Factors
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Your custom quote considers these factors
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {service.pricing.map((factor, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md text-center"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {factor.factor}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{factor.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 md:p-12 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
                Example Pricing
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
                While every facility is unique, here are typical price ranges to help you budget:
              </p>

              {slug === 'office-cleaning' && (
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-gray-100">
                          Small Office (2,000-5,000 sq ft)
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          3x per week, after hours
                        </p>
                      </div>
                      <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        $800-1,500/mo
                      </p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-gray-100">
                          Medium Office (5,000-15,000 sq ft)
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          5x per week, nightly service
                        </p>
                      </div>
                      <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        $2,000-4,500/mo
                      </p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-gray-100">
                          Large Office (15,000+ sq ft)
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Daily service, dedicated team
                        </p>
                      </div>
                      <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        $5,000+/mo
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {slug === 'janitorial' && (
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
                    Janitorial service pricing is similar to office cleaning but includes enhanced
                    quality control and dedicated account management.
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                    <p className="font-bold text-gray-900 dark:text-gray-100 text-center">
                      Typically 10-15% premium over standard office cleaning for added services and
                      oversight
                    </p>
                  </div>
                </div>
              )}

              {(slug === 'floor-carpet-care' ||
                slug === 'window-cleaning' ||
                slug === 'post-construction') && (
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                  <p className="text-gray-700 dark:text-gray-300 text-center">
                    <strong>Project-based pricing</strong> varies widely based on size and
                    condition. Contact us for a free on-site estimate.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-3">
                    Most {service.title.toLowerCase()} projects range from $500-$5,000 depending on
                    facility size and scope.
                  </p>
                </div>
              )}

              {slug === 'supply-management' && (
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-gray-100">
                          Small Facility (1-10 employees)
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Basic consumables + management
                        </p>
                      </div>
                      <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        $150-300/mo
                      </p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-gray-100">
                          Medium Facility (10-50 employees)
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Full consumables management
                        </p>
                      </div>
                      <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        $400-800/mo
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-600 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <strong>Free On-Site Consultation:</strong> Get an exact quote tailored to your
                  facility
                </p>
                <Button variant="primary" size="lg" onClick={() => router.push('/quote')}>
                  Request Your Free Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {service.faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your free quote today and experience the Anderson Cleaning difference.
          </p>
          <Button variant="accent" size="lg" onClick={() => router.push('/quote')}>
            Request Your Free Quote
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
