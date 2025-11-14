'use client'

import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, ArrowLeft } from 'lucide-react'

// Industry data structure
interface IndustryData {
  title: string
  icon: string
  heroDescription: string
  challenges: { title: string; description: string }[]
  solutions: { title: string; description: string }[]
  benefits: string[]
  faqs: { question: string; answer: string }[]
}

// Industry content database
const industriesData: Record<string, IndustryData> = {
  offices: {
    title: 'Office Buildings',
    icon: '🏢',
    heroDescription:
      'Professional cleaning programs that keep your workplace productive, healthy, and presentable for employees and clients.',
    challenges: [
      {
        title: 'High-Traffic Areas',
        description:
          'Lobbies, break rooms, and conference rooms see constant use and require daily attention.',
      },
      {
        title: 'Diverse Spaces',
        description:
          'From open workspaces to private offices, each area has unique cleaning needs.',
      },
      {
        title: 'After-Hours Access',
        description: 'Cleaning must happen without disrupting business operations.',
      },
    ],
    solutions: [
      {
        title: 'Daily Janitorial Programs',
        description:
          'Nightly or weekly cleaning schedules customized to your office layout and foot traffic patterns.',
      },
      {
        title: 'Common Area Focus',
        description:
          'Extra attention to lobbies, break rooms, restrooms, and conference rooms that make first impressions.',
      },
      {
        title: 'Flexible Scheduling',
        description: 'Evening, overnight, or weekend cleaning to avoid disrupting your team.',
      },
    ],
    benefits: [
      'Healthier work environment reduces sick days',
      'Professional appearance impresses clients',
      'Consistent quality with dedicated cleaning teams',
      'All supplies and equipment included',
      'Quality audits and corrective action plans',
    ],
    faqs: [
      {
        question: 'Do you clean during business hours or after hours?',
        answer:
          'We typically clean after hours (evenings or weekends) to avoid disrupting your team. However, we can accommodate day porter services for high-traffic lobbies and restrooms if needed.',
      },
      {
        question: "What's included in daily office cleaning?",
        answer:
          'Daily cleaning includes: emptying trash/recycling, vacuuming/mopping floors, wiping down surfaces, sanitizing restrooms, cleaning break rooms, and dusting common areas. We create custom SOPs based on your office layout.',
      },
      {
        question: 'Can you handle special requests like conference room setup?',
        answer:
          'Yes! For contracted clients, we can provide additional services like conference room setup/breakdown, supply restocking, and special event cleaning.',
      },
    ],
  },
  medical: {
    title: 'Medical Facilities',
    icon: '🏥',
    heroDescription:
      'Healthcare-grade cleaning and sanitation that meets OSHA standards and protects patient safety.',
    challenges: [
      {
        title: 'Infection Control',
        description:
          'Medical environments require strict protocols to prevent cross-contamination.',
      },
      {
        title: 'Regulatory Compliance',
        description:
          'OSHA and HIPAA regulations mandate specific cleaning procedures and documentation.',
      },
      {
        title: 'Sensitive Areas',
        description: 'Exam rooms, waiting areas, and treatment spaces need specialized attention.',
      },
    ],
    solutions: [
      {
        title: 'EPA-Approved Disinfectants',
        description:
          'Hospital-grade disinfectants proven effective against bacteria, viruses, and pathogens.',
      },
      {
        title: 'OSHA-Compliant Training',
        description:
          'All staff trained in bloodborne pathogens, PPE use, and medical facility protocols.',
      },
      {
        title: 'Color-Coded Systems',
        description:
          'Microfiber cloths and mops color-coded by area to prevent cross-contamination.',
      },
    ],
    benefits: [
      'Reduces healthcare-associated infections (HAIs)',
      'Meets OSHA and regulatory requirements',
      'Trained staff understand medical protocols',
      'Documentation for compliance audits',
      'Patient and staff safety prioritized',
    ],
    faqs: [
      {
        question: 'Are your cleaners trained in medical facility protocols?',
        answer:
          'Yes. All staff assigned to medical facilities receive specialized training in OSHA bloodborne pathogens, infection control, and proper use of EPA-approved disinfectants.',
      },
      {
        question: 'What disinfectants do you use in medical facilities?',
        answer:
          'We use EPA-registered, hospital-grade disinfectants with proven efficacy against bacteria, viruses, and pathogens. Products are chosen based on surface types and facility requirements.',
      },
      {
        question: 'Do you provide documentation for inspections?',
        answer:
          'Yes. We maintain detailed cleaning logs, chemical safety data sheets (SDS), and staff training records for compliance audits and inspections.',
      },
    ],
  },
  education: {
    title: 'Educational Facilities',
    icon: '🎓',
    heroDescription:
      'Safe, effective cleaning for schools, colleges, and childcare facilities where health and safety come first.',
    challenges: [
      {
        title: 'High Student Volume',
        description: 'Hundreds or thousands of students create constant cleaning demands.',
      },
      {
        title: 'Safety Requirements',
        description:
          'Cleaning products must be safe for children and meet school district standards.',
      },
      {
        title: 'Diverse Spaces',
        description:
          'Classrooms, cafeterias, gyms, and restrooms each require different approaches.',
      },
    ],
    solutions: [
      {
        title: 'Green Cleaning Products',
        description: 'Non-toxic, environmentally friendly cleaners safe for children and staff.',
      },
      {
        title: 'Daily Disinfection',
        description:
          'High-touch surfaces like desks, door handles, and light switches sanitized daily.',
      },
      {
        title: 'Summer Deep Cleaning',
        description: 'Intensive floor care, window cleaning, and facility refresh during breaks.',
      },
    ],
    benefits: [
      'Safer learning environment for students',
      'Reduces absenteeism from illness',
      'Non-toxic products safe for children',
      'Handles high-traffic areas effectively',
      'Flexible scheduling around school hours',
    ],
    faqs: [
      {
        question: 'Are your cleaning products safe for children?',
        answer:
          'Absolutely. We use non-toxic, environmentally friendly cleaning products that are safe for children and meet or exceed school district requirements.',
      },
      {
        question: 'When do you clean educational facilities?',
        answer:
          'We typically clean after school hours (evenings) and provide deep cleaning services during breaks, holidays, and summer vacation.',
      },
      {
        question: 'Can you handle large facilities like high schools or colleges?',
        answer:
          'Yes. We scale our teams to match your facility size and can deploy multiple crews for larger campuses.',
      },
    ],
  },
  manufacturing: {
    title: 'Manufacturing & Warehouses',
    icon: '🏭',
    heroDescription:
      'Industrial-strength cleaning for manufacturing facilities, warehouses, and distribution centers.',
    challenges: [
      {
        title: 'Heavy Duty Conditions',
        description: 'Industrial environments require specialized equipment and cleaning methods.',
      },
      {
        title: 'Safety Compliance',
        description: 'Maintaining clean walkways and work areas is critical for OSHA compliance.',
      },
      {
        title: 'Large Square Footage',
        description:
          'Warehouses and manufacturing plants cover massive areas requiring efficient processes.',
      },
    ],
    solutions: [
      {
        title: 'Floor Scrubbing Programs',
        description:
          'Industrial floor scrubbers for efficient cleaning of large concrete and epoxy floors.',
      },
      {
        title: 'Safety-First Approach',
        description: 'Teams trained in facility-specific safety protocols and PPE requirements.',
      },
      {
        title: 'Office + Production Areas',
        description: 'Comprehensive cleaning of both office spaces and production floor areas.',
      },
    ],
    benefits: [
      'Maintains safety compliance standards',
      'Reduces slip, trip, and fall hazards',
      'Professional image for client visits',
      'Handles both office and industrial areas',
      'Equipment and expertise for large facilities',
    ],
    faqs: [
      {
        question: 'Can you clean both office and production areas?',
        answer:
          'Yes. We provide comprehensive cleaning for both office/administrative areas and production floor/warehouse spaces.',
      },
      {
        question: 'Do you have industrial floor cleaning equipment?',
        answer:
          'Yes. We have industrial floor scrubbers, sweepers, and specialized equipment for concrete, epoxy, and other industrial flooring.',
      },
      {
        question: 'Are your staff trained in facility safety protocols?',
        answer:
          'Absolutely. Our teams receive training in facility-specific safety requirements, lockout/tagout procedures, and proper PPE use.',
      },
    ],
  },
  'property-management': {
    title: 'Property Management',
    icon: '🏘️',
    heroDescription:
      'Reliable cleaning programs for multi-tenant buildings, apartment complexes, and commercial portfolios.',
    challenges: [
      {
        title: 'Multiple Properties',
        description:
          'Property managers need a single vendor who can handle multiple locations reliably.',
      },
      {
        title: 'Tenant Turnover',
        description: 'Move-outs require fast turnaround cleaning to minimize vacancy periods.',
      },
      {
        title: 'Common Area Maintenance',
        description: 'Lobbies, hallways, amenities, and shared spaces need consistent upkeep.',
      },
    ],
    solutions: [
      {
        title: 'Portfolio-Wide Service',
        description: 'Single point of contact managing cleaning across all your properties.',
      },
      {
        title: 'Turnover Cleaning',
        description: 'Fast, thorough cleaning of vacant units to prepare for new tenants.',
      },
      {
        title: 'Common Area Programs',
        description:
          'Regular cleaning schedules for lobbies, hallways, fitness centers, and amenity spaces.',
      },
    ],
    benefits: [
      'Single vendor for multiple properties',
      'Fast turnover cleaning reduces vacancy',
      'Professional common areas improve tenant satisfaction',
      'Flexible scheduling for unit access',
      'Dedicated account manager for your portfolio',
    ],
    faqs: [
      {
        question: 'Can you handle multiple properties in our portfolio?',
        answer:
          'Yes! We specialize in property management accounts and can handle cleaning across your entire portfolio with a single point of contact.',
      },
      {
        question: 'How quickly can you turn around vacant units?',
        answer:
          'We prioritize turnover cleaning and can typically complete unit cleaning within 24-48 hours depending on size and condition.',
      },
      {
        question: 'Do you provide supplies for common areas?',
        answer:
          'Yes. Through our Supply Management service (for contracted clients), we can manage restocking of paper products, soap, and other consumables.',
      },
    ],
  },
  retail: {
    title: 'Retail Spaces',
    icon: '🏬',
    heroDescription:
      'Professional cleaning that keeps your retail space inviting and impressive for customers.',
    challenges: [
      {
        title: 'Customer-Facing Appearance',
        description: 'Retail spaces must always look pristine during business hours.',
      },
      {
        title: 'High-Traffic Floors',
        description: 'Constant foot traffic wears on floors and requires regular maintenance.',
      },
      {
        title: 'After-Hours Access',
        description: 'Cleaning must happen outside business hours without disrupting operations.',
      },
    ],
    solutions: [
      {
        title: 'After-Hours Cleaning',
        description: 'Evening or overnight cleaning ensures your store is spotless before opening.',
      },
      {
        title: 'Floor Care Programs',
        description: 'Regular strip/wax, buffing, and maintenance to keep floors looking new.',
      },
      {
        title: 'Window & Glass Cleaning',
        description: 'Storefront windows and glass doors cleaned for maximum curb appeal.',
      },
    ],
    benefits: [
      'Professional appearance attracts customers',
      'Clean environment encourages longer shopping',
      'Protects flooring investment',
      'Flexible hours around your business',
      'Specialized retail cleaning experience',
    ],
    faqs: [
      {
        question: 'When do you clean retail stores?',
        answer:
          'We clean after business hours (evenings or overnight) to ensure your store is spotless before opening.',
      },
      {
        question: 'Can you handle floor care for high-traffic retail?',
        answer:
          'Yes. We offer comprehensive floor care including strip/wax, buffing, and regular maintenance programs for retail environments.',
      },
      {
        question: 'Do you clean storefronts and windows?',
        answer:
          'Yes! Window and storefront cleaning is available for contracted clients to maintain curb appeal.',
      },
    ],
  },
}

export default function IndustryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const industry = industriesData[slug]

  // If industry not found, show 404-like message
  if (!industry) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Header />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Industry Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The industry you're looking for doesn't exist or has been moved.
          </p>
          <Button onClick={() => router.push('/industries')}>View All Industries</Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-6">
          <button
            onClick={() => router.push('/industries')}
            className="flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Industries
          </button>

          <div className="flex items-start gap-6">
            <div className="text-7xl">{industry.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{industry.title}</h1>
              <p className="text-xl text-blue-100 max-w-3xl">{industry.heroDescription}</p>
            </div>
          </div>

          <div className="mt-8">
            <Button variant="accent" size="lg" onClick={() => router.push('/quote')}>
              Get Your Free Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
            Unique Challenges in {industry.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Every industry has specific cleaning challenges. Here's what makes{' '}
            {industry.title.toLowerCase()} different:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {industry.challenges.map((challenge, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
            Our Specialized Solutions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            We've developed industry-specific cleaning programs to address these challenges:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {industry.solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-md"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full mb-4 text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
              Benefits for Your Facility
            </h2>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
              <ul className="space-y-4">
                {industry.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-6 w-6 text-accent-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {industry.faqs.map((faq, index) => (
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
            Get a customized cleaning program designed specifically for your{' '}
            {industry.title.toLowerCase()}.
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
