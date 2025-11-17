/**
 * JSON-LD Structured Data Generators
 *
 * Generates schema.org compliant structured data for SEO
 * Helps search engines understand your content better
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://andersoncleaning.com'

// ===== ORGANIZATION SCHEMA =====

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Anderson Cleaning, Inc.',
    legalName: 'Anderson Cleaning, Inc.',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description:
      'Professional commercial cleaning and janitorial services for businesses in Western Massachusetts and Northern Connecticut.',
    foundingDate: '2000',
    email: 'info@andersoncleaning.com',
    telephone: '+1-413-306-5053',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '103 Wayside Ave',
      addressLocality: 'West Springfield',
      addressRegion: 'MA',
      postalCode: '01089',
      addressCountry: 'US',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-413-306-5053',
        contactType: 'Customer Service',
        areaServed: ['US-MA', 'US-CT'],
        availableLanguage: ['en', 'es', 'pt', 'ro'],
        email: 'info@andersoncleaning.com',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-413-306-5053',
        contactType: 'Sales',
        areaServed: ['US-MA', 'US-CT'],
        availableLanguage: ['en', 'es', 'pt', 'ro'],
        email: 'info@andersoncleaning.com',
      },
    ],
    sameAs: [
      'https://www.facebook.com/andersoncleaning',
      'https://www.linkedin.com/company/anderson-cleaning',
      'https://www.instagram.com/andersoncleaning',
    ],
    founder: {
      '@type': 'Person',
      name: 'Anderson',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 50,
    },
  }
}

// ===== LOCAL BUSINESS SCHEMA =====

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#localbusiness`,
    name: 'Anderson Cleaning, Inc.',
    image: `${baseUrl}/images/og-image.jpg`,
    url: baseUrl,
    telephone: '+1-413-306-5053',
    email: 'info@andersoncleaning.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '103 Wayside Ave',
      addressLocality: 'West Springfield',
      addressRegion: 'MA',
      postalCode: '01089',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.107,
      longitude: -72.6209,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 42.107,
        longitude: -72.6209,
      },
      geoRadius: '100 miles',
    },
    paymentAccepted: 'Cash, Credit Card, Invoice, ACH',
    currenciesAccepted: 'USD',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.facebook.com/andersoncleaning',
      'https://www.linkedin.com/company/anderson-cleaning',
      'https://www.instagram.com/andersoncleaning',
    ],
  }
}

// ===== SERVICE SCHEMA =====

export interface ServiceSchemaProps {
  name: string
  description: string
  serviceType: string
  url: string
}

export function generateServiceSchema({ name, description, serviceType, url }: ServiceSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider: {
      '@type': 'Organization',
      name: 'Anderson Cleaning, Inc.',
      url: baseUrl,
      telephone: '+1-413-306-5053',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '103 Wayside Ave',
        addressLocality: 'West Springfield',
        addressRegion: 'MA',
        postalCode: '01089',
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 42.107,
        longitude: -72.6209,
      },
      geoRadius: '100 miles',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Commercial Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name,
            description,
          },
        },
      ],
    },
    url,
  }
}

// ===== FAQ PAGE SCHEMA =====

export interface FAQItem {
  question: string
  answer: string
}

export function generateFAQPageSchema(faqItems: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// ===== BREADCRUMB SCHEMA =====

export interface BreadcrumbItem {
  name: string
  url: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// ===== REVIEW SCHEMA =====

export interface ReviewSchemaProps {
  author: string
  company: string
  rating: number
  reviewBody: string
  datePublished: string
}

export function generateReviewSchema({
  author,
  company,
  rating,
  reviewBody,
  datePublished,
}: ReviewSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'Anderson Cleaning, Inc.',
      image: `${baseUrl}/images/og-image.jpg`,
      telephone: '+1-413-306-5053',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '103 Wayside Ave',
        addressLocality: 'West Springfield',
        addressRegion: 'MA',
        postalCode: '01089',
        addressCountry: 'US',
      },
    },
    author: {
      '@type': 'Person',
      name: `${author} - ${company}`,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody,
    datePublished,
  }
}

// ===== AGGREGATE RATING SCHEMA =====

export interface AggregateRatingProps {
  ratingValue: number
  reviewCount: number
}

export function generateAggregateRatingSchema({ ratingValue, reviewCount }: AggregateRatingProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Anderson Cleaning, Inc.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
  }
}

// ===== OFFER SCHEMA (for Quote Page) =====

export function generateOfferSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Commercial Cleaning Services',
      description: 'Professional commercial cleaning and janitorial services for businesses',
    },
    seller: {
      '@type': 'Organization',
      name: 'Anderson Cleaning, Inc.',
    },
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'USD',
      price: 'Contact for Quote',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 42.107,
        longitude: -72.6209,
      },
      geoRadius: '100 miles',
    },
  }
}

// ===== WEBSITE SCHEMA =====

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Anderson Cleaning',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ===== JOB POSTING SCHEMA =====

export interface JobPostingSchemaProps {
  title?: string
  description?: string
  datePosted?: string
  validThrough?: string
  employmentType?: string[]
  hiringOrganization?: {
    name: string
    sameAs?: string
    logo?: string
  }
  jobLocation?: {
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
  baseSalary?: {
    currency: string
    value: {
      minValue: number
      maxValue: number
      unitText: string
    }
  }
}

export function generateJobPostingSchema(props?: JobPostingSchemaProps) {
  const {
    title = 'Commercial Cleaning Team Member',
    description = 'Join our full-time professional cleaning team. We offer competitive benefits, comprehensive training, and career advancement opportunities.',
    datePosted = new Date().toISOString().split('T')[0],
    validThrough = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now
    employmentType = ['FULL_TIME'],
    hiringOrganization = {
      name: 'Anderson Cleaning, Inc.',
      sameAs: baseUrl,
      logo: `${baseUrl}/images/logo.png`,
    },
    jobLocation = {
      addressLocality: 'Springfield',
      addressRegion: 'MA',
      addressCountry: 'US',
    },
    baseSalary = {
      currency: 'USD',
      value: {
        minValue: 35000,
        maxValue: 45000,
        unitText: 'YEAR',
      },
    },
  } = props || {}

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    datePosted,
    validThrough,
    employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: hiringOrganization.name,
      sameAs: hiringOrganization.sameAs,
      logo: hiringOrganization.logo,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: jobLocation.addressLocality,
        addressRegion: jobLocation.addressRegion,
        addressCountry: jobLocation.addressCountry,
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: baseSalary.currency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: baseSalary.value.minValue,
        maxValue: baseSalary.value.maxValue,
        unitText: baseSalary.value.unitText,
      },
    },
    jobBenefits: 'Health insurance, paid time off, career advancement opportunities, comprehensive training',
    qualifications: 'No experience required - we provide full training',
    responsibilities: 'Professional commercial cleaning services for offices, medical facilities, schools, and other commercial properties',
    skills: 'Attention to detail, reliability, team player, customer service oriented',
    workHours: 'Full-time positions available with flexible schedules',
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'US',
    },
    jobLocationType: 'TELECOMMUTE' as const,
  }
}
