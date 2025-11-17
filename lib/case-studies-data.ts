/**
 * Case Studies Data
 *
 * Complete data for all Anderson Cleaning case studies.
 * Each case study follows the Problem → Solution → Results format.
 *
 * To add a new case study:
 * 1. Add a new object to the caseStudies array
 * 2. Follow the CaseStudy interface structure
 * 3. Include all required fields
 * 4. Use descriptive slugs for URLs
 */

// Icons are now referenced by string name instead of importing components
// This allows data to be serializable when passed from Server to Client Components

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface CaseStudyMetric {
  value: string
  label: string
  description?: string
}

export interface CaseStudyQuote {
  text: string
  author: string
  role: string
  company?: string
}

export interface CaseStudyClient {
  name: string // Use 'Anonymous [Industry] Facility' if client prefers anonymity
  industry: string
  location: string
  facilitySize: string
  employees: number
}

export interface CaseStudyChallenge {
  headline: string
  description: string[]
  painPoints: string[]
}

export interface CaseStudySolution {
  description: string[]
  servicesUsed: string[]
  timeline: string
}

export interface CaseStudyResults {
  metrics: CaseStudyMetric[]
  quote?: CaseStudyQuote
  additionalOutcomes?: string[]
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  client: CaseStudyClient
  featuredImage: string
  keyResult: string
  icon: string // Icon name as string (e.g., 'Heart', 'Building2', 'Factory')
  challenge: CaseStudyChallenge
  solution: CaseStudySolution
  results: CaseStudyResults
  publishedDate: string
}

// ============================================================================
// CASE STUDIES DATA
// ============================================================================

export const caseStudies: CaseStudy[] = [
  // ==========================================================================
  // CASE STUDY 1: MEDICAL OFFICE - HEALTHCARE INDUSTRY
  // ==========================================================================
  {
    id: 'medical-office-sick-days',
    slug: 'medical-office-reduces-sick-days',
    title: 'Medical Office Complex Reduces Sick Days by 40%',
    client: {
      name: 'Springfield Family Medicine',
      industry: 'Healthcare',
      location: 'Springfield, MA',
      facilitySize: '15,000 sq ft',
      employees: 45,
    },
    featuredImage: '/images/case-studies/medical-office-hero.jpg',
    keyResult: '40% reduction in employee sick days',
    icon: 'Heart',
    publishedDate: '2024-09-15',

    challenge: {
      headline: 'High employee sick rates and inconsistent cleaning quality',
      description: [
        'Springfield Family Medicine was experiencing employee sick days 30% above the healthcare industry average. With 45 staff members across nursing, reception, and administrative roles, unexpected absences were disrupting patient care and forcing expensive temporary staffing solutions.',
        'Their previous cleaning contractor provided inconsistent service quality. High-touch surfaces like door handles, light switches, and medical equipment were often missed. The practice had no documented cleaning protocols, making it impossible to verify what was actually being cleaned each night.',
        'A routine OSHA inspection revealed multiple deficiencies in their sanitation procedures. While not severe enough to halt operations, these findings damaged the practice\'s reputation and created anxiety among staff about workplace safety. Patient satisfaction scores were declining, with several online reviews mentioning concerns about cleanliness in waiting areas.',
        'The practice needed a solution that would not only improve cleaning quality but also provide documentation for regulatory compliance and measurably improve employee health outcomes.',
      ],
      painPoints: [
        'Employee sick days 30% above healthcare industry average',
        'Patient complaints about cleanliness in waiting areas and restrooms',
        'Failed multiple OSHA inspection checklist items',
        'No documented cleaning protocols or verification systems',
        'Inconsistent quality from previous contractor',
        'High-touch surfaces frequently missed during cleaning',
      ],
    },

    solution: {
      description: [
        'Anderson Cleaning implemented a comprehensive medical facility cleaning program designed specifically for healthcare environments. We began with a detailed facility assessment, identifying all high-risk areas and high-touch surfaces that required special attention.',
        'Our team developed custom Standard Operating Procedures (SOPs) that exceeded CDC and OSHA requirements. These included EPA-registered hospital-grade disinfectants, color-coded microfiber systems to prevent cross-contamination, and documented cleaning schedules for every area of the practice.',
        'We assigned a dedicated 3-person team who received specialized training in healthcare cleaning protocols, including proper PPE usage, bloodborne pathogen awareness, and medical waste handling. The same team works the facility every night, building familiarity with the space and accountability for results.',
        'To ensure compliance and quality, we implemented a digital verification system. Each cleaning task is logged in real-time via mobile devices, creating an auditable record. Our supervisor conducts weekly quality audits using ATP testing to verify surface cleanliness at a microbial level.',
      ],
      servicesUsed: [
        'Daily medical facility cleaning with CDC-compliant protocols',
        'EPA-registered hospital-grade disinfection',
        'High-touch surface sanitization (multiple times daily)',
        'Exam room turnover cleaning',
        'Medical waste handling and removal',
        'Digital quality verification system',
        'Weekly ATP testing and quality audits',
      ],
      timeline: '7 days from initial consultation to full implementation',
    },

    results: {
      metrics: [
        {
          value: '40%',
          label: 'Reduction in sick days',
          description: 'Employee sick days dropped from 30% above average to 10% below average',
        },
        {
          value: '100%',
          label: 'OSHA compliance',
          description: 'Passed follow-up inspection with zero deficiencies',
        },
        {
          value: '3 years',
          label: 'Contract renewal',
          description: 'Client renewed for 3 additional years after initial 1-year contract',
        },
        {
          value: '95%',
          label: 'Patient satisfaction',
          description: 'Cleanliness ratings increased from 78% to 95% in patient surveys',
        },
      ],
      quote: {
        text: 'Anderson Cleaning transformed our practice. The attention to detail and consistent quality have made a measurable difference in both employee health and patient satisfaction. Having documented cleaning protocols has been invaluable for regulatory compliance.',
        author: 'Dr. Sarah Mitchell',
        role: 'Medical Director',
        company: 'Springfield Family Medicine',
      },
      additionalOutcomes: [
        'Eliminated patient complaints about cleanliness',
        'Reduced temporary staffing costs by $18,000 annually',
        'Improved staff morale and workplace safety perception',
        'Achieved 5-star Google rating for facility cleanliness',
      ],
    },
  },

  // ==========================================================================
  // CASE STUDY 2: CORPORATE OFFICE - PROFESSIONAL SERVICES
  // ==========================================================================
  {
    id: 'corporate-office-employee-satisfaction',
    slug: 'corporate-office-improves-employee-satisfaction',
    title: 'Law Firm Increases Employee Satisfaction by 32%',
    client: {
      name: 'Harrington & Associates Law',
      industry: 'Corporate Offices',
      location: 'Worcester, MA',
      facilitySize: '22,000 sq ft',
      employees: 68,
    },
    featuredImage: '/images/case-studies/corporate-office-hero.jpg',
    keyResult: '32% increase in workplace satisfaction scores',
    icon: 'Building2',
    publishedDate: '2024-08-22',

    challenge: {
      headline: 'Poor office presentation damaging professional image and employee morale',
      description: [
        'Harrington & Associates is a prestigious law firm serving corporate clients across New England. Their Worcester headquarters occupies three floors of a downtown office building, with conference rooms, private offices, a law library, and client reception areas that see dozens of visitors daily.',
        'Despite charging premium rates, the firm\'s office appearance was undermining their professional image. Carpets showed visible stains and traffic patterns. Dust accumulated on conference room tables between cleanings. Restrooms frequently ran out of supplies during business hours. Client-facing areas looked tired and unkempt.',
        'An internal employee satisfaction survey revealed that workplace cleanliness was the #2 complaint, with 64% of attorneys and staff expressing dissatisfaction. Several partners reported that clients had made comments about the office appearance. The firm\'s previous cleaning service came sporadically, often skipped scheduled visits without notice, and showed little attention to detail.',
        'The managing partner recognized that office environment directly impacts both employee retention and client perception. They needed a cleaning partner who understood that a law firm\'s office is a reflection of its professionalism and attention to detail.',
      ],
      painPoints: [
        'Visible carpet stains and wear patterns in high-traffic areas',
        'Dust and debris on conference tables and shared workspaces',
        'Inconsistent restroom supply management',
        'Previous contractor frequently missed scheduled visits',
        'Client comments about office appearance',
        'Employee satisfaction survey: 64% dissatisfied with cleanliness',
        'Professional image not matching premium service positioning',
      ],
    },

    solution: {
      description: [
        'Anderson Cleaning designed a comprehensive commercial office cleaning program tailored to the law firm\'s needs and schedule. We established a nightly cleaning routine from 6:00 PM to 10:00 PM, after attorneys and staff depart, ensuring zero disruption to billable hours.',
        'Our team implemented a "white glove" standard for all client-facing areas. Conference rooms are detail-cleaned after each use, not just at night. Reception areas receive multiple daily check-ins to ensure they remain pristine throughout business hours. We installed a restroom monitoring system with scheduled checks every 2 hours to maintain supplies and cleanliness.',
        'For the carpet issues, we brought in our specialized floor care division to perform a deep extraction cleaning, removing years of built-up soil. We then established a maintenance program combining daily vacuuming with monthly hot water extraction in high-traffic areas and quarterly deep cleaning for the entire office.',
        'To ensure accountability, we assigned a dedicated account manager who conducts weekly walk-throughs with the firm administrator. Any concerns are addressed within 24 hours. Our team uses a digital checklist system that provides real-time updates when each area is completed, giving the firm complete visibility into our service.',
      ],
      servicesUsed: [
        'Nightly office cleaning (5 nights per week)',
        'Conference room turnover service',
        'Daily reception area maintenance',
        'Restroom monitoring system (checks every 2 hours during business)',
        'Carpet care program (monthly extraction, quarterly deep cleaning)',
        'Supply management and restocking',
        'Weekly account manager walk-throughs',
        'Digital checklist and reporting system',
      ],
      timeline: '14 days from contract signing to full program implementation',
    },

    results: {
      metrics: [
        {
          value: '32%',
          label: 'Increase in satisfaction',
          description: 'Employee workplace satisfaction improved from 36% to 68% satisfied',
        },
        {
          value: '100%',
          label: 'Service reliability',
          description: 'Zero missed visits in 18 months of service',
        },
        {
          value: '2.5 years',
          label: 'Average tenure increase',
          description: 'Support staff retention improved significantly',
        },
        {
          value: '0',
          label: 'Client complaints',
          description: 'Zero client comments about office appearance since implementation',
        },
      ],
      quote: {
        text: 'The transformation has been remarkable. Our office now reflects the level of professionalism our clients expect. More importantly, our team takes pride in their workplace again. Anderson Cleaning doesn\'t just clean—they understand that our office is part of our brand.',
        author: 'James Harrington',
        role: 'Managing Partner',
        company: 'Harrington & Associates Law',
      },
      additionalOutcomes: [
        'Eliminated all client comments about office appearance',
        'Improved employee retention, particularly among support staff',
        'Conference rooms are always presentation-ready',
        'Restroom supply stockouts reduced to zero',
        'Firm can now host client events without pre-event cleaning prep',
      ],
    },
  },

  // ==========================================================================
  // CASE STUDY 3: MANUFACTURING FACILITY - INDUSTRIAL
  // ==========================================================================
  {
    id: 'manufacturing-facility-safety',
    slug: 'manufacturing-facility-improves-safety-record',
    title: 'Manufacturing Plant Achieves Zero Slip-and-Fall Incidents',
    client: {
      name: 'Precision Components Manufacturing',
      industry: 'Manufacturing / Industrial',
      location: 'Chicopee, MA',
      facilitySize: '85,000 sq ft',
      employees: 120,
    },
    featuredImage: '/images/case-studies/manufacturing-facility-hero.jpg',
    keyResult: 'Zero slip-and-fall incidents for 18+ months',
    icon: 'Factory',
    publishedDate: '2024-07-10',

    challenge: {
      headline: 'Workplace safety incidents and heavy industrial cleaning challenges',
      description: [
        'Precision Components Manufacturing operates a high-volume metal fabrication facility running two shifts daily. The 85,000 square foot plant produces precision-machined components for aerospace and automotive industries, with strict quality and safety requirements.',
        'The facility was experiencing 3-4 slip-and-fall incidents per year, primarily caused by metal shavings, coolant residue, and oil accumulation on production floor surfaces. Each incident resulted in workers\' compensation claims, OSHA recordable injuries, lost work time, and potential liability. Their insurance carrier was threatening to raise premiums unless safety metrics improved.',
        'The plant\'s previous cleaning approach relied on day-shift production workers doing basic sweeping, with a small night crew handling restrooms and offices. Production floors received irregular attention, and the heavy industrial soil—cutting oils, metal particulate, hydraulic fluid—required specialized equipment and expertise that the facility didn\'t have in-house.',
        'The facility manager needed a professional industrial cleaning partner who understood manufacturing environments, could work safely around production equipment, and had the specialized equipment to handle heavy-duty cleaning challenges. Most importantly, they needed measurable improvements in workplace safety.',
      ],
      painPoints: [
        '3-4 slip-and-fall incidents per year (OSHA recordables)',
        'Workers\' compensation claims averaging $15,000 per incident',
        'Insurance carrier threatening premium increases',
        'Metal shavings, coolant, and oil accumulation on floors',
        'No specialized industrial cleaning equipment',
        'Production workers spending time on cleaning instead of manufacturing',
        'Irregular cleaning schedules disrupting production flow',
        'No documented cleaning protocols for regulatory audits',
      ],
    },

    solution: {
      description: [
        'Anderson Cleaning deployed our industrial cleaning division with specialized training and equipment for manufacturing environments. We conducted a comprehensive facility assessment, identifying all high-risk areas, traffic patterns, and production schedule constraints.',
        'We implemented a daily floor care program using industrial auto-scrubbers with degreasing solutions designed specifically for manufacturing environments. Our team performs systematic cleaning between first and second shift (2:30 PM - 5:00 PM), removing metal shavings, coolant residue, and oil accumulation before the next production cycle begins.',
        'For heavy soil areas around CNC machines and cutting stations, we use industrial wet/dry vacuums to capture metal particulate and fluids immediately. We installed slip-resistant matting in high-risk zones and established a rapid-response protocol for any spills during production hours.',
        'Our team received extensive safety training specific to this facility, including lockout/tagout procedures, compressed air safety, and proper PPE for industrial environments. All cleaning staff are equipped with steel-toe boots, safety glasses, and high-visibility vests. We coordinate daily with the facility manager to ensure cleaning never interferes with production schedules.',
        'To demonstrate results, we implemented a safety tracking dashboard that monitors floor condition audits, incident reports, and inspection findings. The facility manager receives weekly reports showing cleaning completion, any safety concerns identified, and trend data.',
      ],
      servicesUsed: [
        'Daily industrial floor care with auto-scrubbers',
        'Inter-shift cleaning (between 1st and 2nd shift)',
        'Metal shavings and coolant removal',
        'Industrial degreasing and oil removal',
        'High-risk area matting installation',
        'Rapid-response spill cleanup protocol',
        'Office and restroom facility maintenance',
        'Safety training and compliance documentation',
        'Weekly reporting and safety tracking dashboard',
      ],
      timeline: '21 days from initial assessment to full program launch',
    },

    results: {
      metrics: [
        {
          value: '0',
          label: 'Slip-and-fall incidents',
          description: 'Zero incidents for 18+ consecutive months (previously 3-4 per year)',
        },
        {
          value: '$45,000',
          label: 'Annual savings',
          description: 'Reduced workers\' comp claims, insurance premiums, and lost time',
        },
        {
          value: '15%',
          label: 'Productivity increase',
          description: 'Production workers no longer spending time on floor cleaning',
        },
        {
          value: '100%',
          label: 'Safety audit score',
          description: 'Perfect score on insurance carrier safety inspection',
        },
      ],
      quote: {
        text: 'Anderson Cleaning has been a game-changer for our safety program. Their industrial cleaning expertise and commitment to working within our production schedule has eliminated our slip-and-fall problem entirely. The $45,000 in annual savings more than pays for their service.',
        author: 'Michael Torres',
        role: 'Facility Manager',
        company: 'Precision Components Manufacturing',
      },
      additionalOutcomes: [
        'Insurance carrier removed threat of premium increase',
        'Achieved 18+ months without a slip-and-fall incident',
        'Production workers freed up to focus on manufacturing tasks',
        'Improved floor appearance during customer facility tours',
        'Passed surprise OSHA inspection with zero citations',
        'Client expanded service to include warehouse and loading dock areas',
      ],
    },
  },
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get a single case study by its slug
 * @param slug - The URL-friendly slug
 * @returns Case study object or undefined if not found
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}

/**
 * Get all case study slugs (for static generation)
 * @returns Array of all case study slugs
 */
export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.slug)
}

/**
 * Get case studies filtered by industry
 * @param industry - Industry to filter by
 * @returns Array of case studies matching the industry
 */
export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  return caseStudies.filter((study) => study.client.industry === industry)
}

/**
 * Get all unique industries from case studies
 * @returns Array of unique industry names
 */
export function getAllIndustries(): string[] {
  const industries = caseStudies.map((study) => study.client.industry)
  return Array.from(new Set(industries))
}
