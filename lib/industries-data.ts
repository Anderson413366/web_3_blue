/**
 * Industries Data Configuration
 *
 * This file contains all data for industry-specific pages.
 * Each industry has complete information for rendering the industry template.
 *
 * To add a new industry:
 * 1. Copy an existing industry object
 * 2. Update all fields with new industry data
 * 3. Add icon component import if needed
 * 4. The page will automatically generate from this data
 */

// Icons are now stored as strings and mapped to components via getIconComponent()
// in consuming components. This prevents Server/Client boundary violations.

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface IndustrySolution {
  title: string
  description: string
}

export interface IndustryTestimonial {
  quote: string
  author: string
  company: string
  role: string
}

export interface IndustryHero {
  title: string
  subtitle: string
  backgroundImage: string
}

export interface Industry {
  id: string
  name: string
  slug: string
  icon: string // Icon name (e.g., 'Heart', 'Building2')
  shortDescription: string
  hero: IndustryHero
  overview: string[]
  challenges: string[]
  solutions: IndustrySolution[]
  compliance: string[]
  testimonials: IndustryTestimonial[]
}

// ============================================================================
// INDUSTRIES DATA
// ============================================================================

export const industries: Industry[] = [
  // --------------------------------------------------------------------------
  // HEALTHCARE FACILITIES
  // --------------------------------------------------------------------------
  {
    id: 'healthcare',
    name: 'Healthcare Facilities',
    slug: 'healthcare',
    icon: 'Heart',
    shortDescription:
      'OSHA-compliant cleaning with EPA-registered disinfectants for medical offices and clinics. Protecting patients and staff with medical-grade sanitation.',
    hero: {
      title: 'Healthcare Facility Cleaning Services',
      subtitle: 'Medical-grade cleaning that meets OSHA and CDC standards',
      backgroundImage: '/images/industries/healthcare-hero.jpg',
    },
    overview: [
      'Healthcare facilities require the highest standards of cleanliness to protect vulnerable patients and prevent healthcare-associated infections (HAIs). Our specialized medical facility cleaning services are designed to meet OSHA regulations, CDC guidelines, and state health department requirements.',
      'Our team is trained in proper infection control protocols, including the correct use of EPA-registered disinfectants, proper PPE usage, and medical waste handling procedures. We understand the critical importance of maintaining a sterile environment in medical settings.',
      'From waiting rooms to exam rooms, we provide comprehensive cleaning solutions that keep your patients safe and your facility compliant with all healthcare regulations.',
    ],
    challenges: [
      'Preventing cross-contamination between patient areas',
      'Meeting strict OSHA and CDC sanitation standards',
      'Effective high-touch surface disinfection protocols',
      'Proper handling and disposal of medical waste',
      'Minimizing disruption to patient care schedules',
      'Maintaining sterile environments in treatment areas',
    ],
    solutions: [
      {
        title: 'EPA-Registered Disinfectants',
        description:
          'We use hospital-grade disinfectants that kill 99.9% of pathogens, including MRSA, C. diff, and other healthcare-associated infections. All products are EPA-registered and safe for medical environments.',
      },
      {
        title: 'Trained Medical Facility Staff',
        description:
          'Our cleaning professionals receive specialized training in healthcare protocols, infection control, OSHA regulations, and proper use of personal protective equipment (PPE).',
      },
      {
        title: 'Color-Coded Cleaning System',
        description:
          'We implement a color-coded microfiber system to prevent cross-contamination between different areas of your facility, ensuring patient areas remain protected.',
      },
      {
        title: 'Flexible Scheduling',
        description:
          'We work around your patient care schedule, providing cleaning services during off-hours or between appointments to minimize disruption to your operations.',
      },
    ],
    compliance: [
      'OSHA Compliant',
      'CDC Guidelines',
      'EPA-Registered Products',
      'Background-Checked Staff',
      'HIPAA Training',
      'Bloodborne Pathogen Certified',
    ],
    testimonials: [
      {
        quote:
          'Anderson Cleaning has been instrumental in maintaining the highest sanitation standards in our medical practice. Their attention to detail and knowledge of healthcare regulations gives us complete confidence in patient safety.',
        author: 'Dr. Sarah Mitchell',
        company: 'Springfield Family Medicine',
        role: 'Medical Director',
      },
      {
        quote:
          'We have worked with several cleaning companies over the years, but Anderson Cleaning is the only one that truly understands the unique needs of a healthcare facility. Their staff is professional, thorough, and reliable.',
        author: 'Jennifer Roberts',
        company: 'HealthFirst Urgent Care',
        role: 'Operations Manager',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // CORPORATE OFFICES
  // --------------------------------------------------------------------------
  {
    id: 'corporate',
    name: 'Corporate Offices',
    slug: 'corporate-offices',
    icon: 'Building2',
    shortDescription:
      'Professional office cleaning that creates a positive impression on clients and boosts employee productivity. Flexible scheduling to fit your business hours.',
    hero: {
      title: 'Corporate Office Cleaning Services',
      subtitle: 'Professional environments that impress clients and inspire teams',
      backgroundImage: '/images/industries/corporate-hero.jpg',
    },
    overview: [
      'A clean, well-maintained office environment is essential for employee productivity, client impressions, and workplace health. Our corporate office cleaning services are designed to keep your workspace looking professional while creating a healthy environment for your team.',
      'We understand the unique needs of corporate environments, from executive suites to collaborative workspaces. Our services are customized to match your office layout, traffic patterns, and specific requirements, ensuring every area receives the appropriate level of attention.',
      'With flexible scheduling options, we can clean during off-hours to avoid disrupting your business operations, or provide day porter services for high-traffic areas that need continuous maintenance.',
    ],
    challenges: [
      'Maintaining professional appearance in client-facing areas',
      'Managing cleaning in open-plan office layouts',
      'Keeping high-traffic areas consistently clean',
      'Balancing thorough cleaning with minimal disruption',
      'Managing waste and recycling programs effectively',
      'Controlling allergens and maintaining air quality',
    ],
    solutions: [
      {
        title: 'Customized Cleaning Plans',
        description:
          'We create tailored cleaning schedules based on your office layout, traffic patterns, and specific needs, ensuring every area receives appropriate attention.',
      },
      {
        title: 'After-Hours Service',
        description:
          'Our team works during evenings or weekends to avoid disrupting your business operations, arriving to a fresh, clean office each morning.',
      },
      {
        title: 'Green Cleaning Options',
        description:
          'We offer eco-friendly cleaning products and methods that are safe for your employees while maintaining the highest cleaning standards.',
      },
      {
        title: 'Day Porter Services',
        description:
          'For high-traffic offices, we provide daytime maintenance services to keep lobbies, restrooms, and common areas continuously presentable.',
      },
    ],
    compliance: [
      'OSHA Compliant',
      'Insured & Bonded',
      'Background-Checked Staff',
      'Green Seal Certified Products',
      'Safety Data Sheets (SDS) Available',
    ],
    testimonials: [
      {
        quote:
          'Our office has never looked better. Anderson Cleaning pays attention to details that other companies miss, and our employees have commented on how much nicer the workspace feels.',
        author: 'Michael Chen',
        company: 'TechVenture Solutions',
        role: 'Facilities Manager',
      },
      {
        quote:
          'The professionalism and reliability of Anderson Cleaning is exceptional. They work seamlessly around our schedule and always deliver consistent, high-quality results.',
        author: 'Patricia Williams',
        company: 'Commonwealth Financial Group',
        role: 'Office Administrator',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // EDUCATIONAL FACILITIES
  // --------------------------------------------------------------------------
  {
    id: 'education',
    name: 'Educational Facilities',
    slug: 'educational-facilities',
    icon: 'GraduationCap',
    shortDescription:
      'School and university cleaning focused on student health and safety. Experience with classrooms, cafeterias, gyms, and common areas.',
    hero: {
      title: 'Educational Facility Cleaning Services',
      subtitle: 'Creating healthy learning environments for students and staff',
      backgroundImage: '/images/industries/education-hero.jpg',
    },
    overview: [
      'Educational facilities face unique cleaning challenges with high student traffic, diverse spaces, and the critical importance of maintaining healthy environments for learning. Our school and university cleaning services are designed to create safe, sanitary spaces that support student health and academic success.',
      'We understand that educational facilities require specialized attention to different areas—from classrooms and laboratories to cafeterias, gymnasiums, and dormitories. Our team is trained in proper disinfection protocols for high-touch surfaces and effective strategies for managing the spread of illness in school settings.',
      'Working with your schedule, we provide thorough cleaning services during evenings, weekends, or school breaks to ensure minimal disruption to educational activities while maintaining the highest standards of cleanliness.',
    ],
    challenges: [
      'Managing high student and staff traffic volumes',
      'Preventing illness spread in close-contact environments',
      'Cleaning diverse facility types (classrooms, labs, gyms)',
      'Maintaining cafeteria and food service area sanitation',
      'Effective restroom hygiene with heavy usage',
      'Balancing thorough cleaning with tight schedules',
    ],
    solutions: [
      {
        title: 'Disinfection Protocols',
        description:
          'We use EPA-registered disinfectants proven effective against common viruses and bacteria, with special focus on high-touch surfaces like desks, doorknobs, and light switches.',
      },
      {
        title: 'Child-Safe Products',
        description:
          'All cleaning products are selected for safety around children and students, meeting or exceeding school safety standards while maintaining effectiveness.',
      },
      {
        title: 'Specialized Area Cleaning',
        description:
          'From science labs to art rooms, we provide specialized cleaning for different educational environments, understanding the unique requirements of each space.',
      },
      {
        title: 'Flu Season Protocols',
        description:
          'Enhanced cleaning and disinfection during cold and flu season to help reduce illness transmission and keep students in school.',
      },
    ],
    compliance: [
      'EPA-Registered Disinfectants',
      'Child-Safe Products',
      'Background-Checked Staff',
      'OSHA Compliant',
      'School Safety Standards',
      'Food Service Area Certified',
    ],
    testimonials: [
      {
        quote:
          'Since partnering with Anderson Cleaning, we have seen a noticeable reduction in student absences during flu season. Their thorough disinfection protocols make a real difference.',
        author: 'Principal James Anderson',
        company: 'Lincoln Elementary School',
        role: 'Principal',
      },
      {
        quote:
          'Anderson Cleaning understands the complexity of maintaining a large educational campus. They are reliable, thorough, and always responsive to our specific needs.',
        author: 'Karen Thompson',
        company: 'Springfield Community College',
        role: 'Facilities Director',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // RETAIL STORES
  // --------------------------------------------------------------------------
  {
    id: 'retail',
    name: 'Retail Stores',
    slug: 'retail-stores',
    icon: 'ShoppingBag',
    shortDescription:
      'Retail cleaning services that enhance customer experience and protect your brand image. Flexible scheduling for storefronts, fitting rooms, and sales floors.',
    hero: {
      title: 'Retail Store Cleaning Services',
      subtitle: 'Clean stores that drive sales and enhance customer experience',
      backgroundImage: '/images/industries/retail-hero.jpg',
    },
    overview: [
      'In retail, first impressions matter. A clean, well-maintained store creates a positive shopping experience that encourages customers to browse longer and return more often. Our retail cleaning services are designed to keep your store looking its best while maintaining the welcoming atmosphere that drives sales.',
      'We understand the unique challenges of retail environments—from managing high foot traffic to cleaning around merchandise displays. Our team is trained to work efficiently without disrupting your customers or moving product, ensuring your store remains operational and attractive at all times.',
      'Whether you operate a small boutique or a large retail space, we provide customized cleaning solutions that fit your hours, your budget, and your brand standards.',
    ],
    challenges: [
      'Maintaining cleanliness during operating hours',
      'Managing high customer foot traffic',
      'Cleaning without disrupting merchandise displays',
      'Keeping fitting rooms and restrooms pristine',
      'Handling seasonal traffic surges',
      'Creating positive first impressions at entrances',
    ],
    solutions: [
      {
        title: 'Flexible Scheduling',
        description:
          'We work before opening, after closing, or during slower periods to ensure your store is always clean without disrupting the customer experience.',
      },
      {
        title: 'High-Traffic Area Focus',
        description:
          'Special attention to entrances, checkout areas, and fitting rooms—the spaces that most impact customer perception and satisfaction.',
      },
      {
        title: 'Floor Care Expertise',
        description:
          'Professional care for all flooring types, from polished tile to carpet, keeping your sales floor looking pristine and inviting.',
      },
      {
        title: 'Display-Safe Cleaning',
        description:
          'Our team is trained to clean around merchandise and displays without moving products, maintaining your store layout while ensuring cleanliness.',
      },
    ],
    compliance: [
      'Insured & Bonded',
      'Background-Checked Staff',
      'OSHA Compliant',
      'Retail Standards Training',
      'Loss Prevention Protocols',
    ],
    testimonials: [
      {
        quote:
          'Our customers have noticed the difference. Anderson Cleaning helps us maintain the high standards our brand requires, and they work seamlessly around our operating hours.',
        author: 'Rebecca Martinez',
        company: 'Elegant Interiors',
        role: 'Store Manager',
      },
      {
        quote:
          'During the holiday season, Anderson Cleaning increased their service frequency to match our increased foot traffic. This flexibility and responsiveness is exactly what we need in a retail cleaning partner.',
        author: 'David Park',
        company: 'Springfield Sporting Goods',
        role: 'Owner',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // MANUFACTURING & WAREHOUSES
  // --------------------------------------------------------------------------
  {
    id: 'manufacturing',
    name: 'Manufacturing & Warehouses',
    slug: 'manufacturing-warehouses',
    icon: 'Factory',
    shortDescription:
      'Industrial cleaning for manufacturing plants and warehouses. OSHA-compliant services including floor care, equipment cleaning, and facility maintenance.',
    hero: {
      title: 'Manufacturing & Warehouse Cleaning Services',
      subtitle: 'Industrial cleaning that keeps your operation running safely and efficiently',
      backgroundImage: '/images/industries/manufacturing-hero.jpg',
    },
    overview: [
      'Manufacturing and warehouse facilities require specialized cleaning services that go beyond standard commercial cleaning. Our industrial cleaning team understands the unique challenges of production environments, from managing industrial dust and debris to maintaining safe, compliant facilities that meet OSHA standards.',
      'We provide comprehensive cleaning solutions for all areas of your facility, including production floors, warehouses, break rooms, offices, and restrooms. Our services are designed to support your operational efficiency while maintaining the safety and cleanliness standards required in industrial settings.',
      'With flexible scheduling options, we can clean during shift changes, weekends, or during planned downtime, ensuring your operations continue without interruption while maintaining a safe, clean work environment for your team.',
    ],
    challenges: [
      'Managing industrial dust and debris accumulation',
      'Maintaining OSHA compliance and safety standards',
      'Cleaning large-scale facilities efficiently',
      'Handling specialized equipment cleaning',
      'Coordinating around production schedules',
      'Addressing spills and emergency cleaning needs',
    ],
    solutions: [
      {
        title: 'Industrial Equipment Expertise',
        description:
          'We have the equipment and expertise to handle large-scale facility cleaning, including floor scrubbers, high-capacity vacuums, and pressure washers.',
      },
      {
        title: 'OSHA Compliance Focus',
        description:
          'Our cleaning protocols are designed to support your OSHA compliance, with proper handling of industrial waste, chemical safety, and facility maintenance.',
      },
      {
        title: 'Production Schedule Coordination',
        description:
          'We work closely with your operations team to schedule cleaning during optimal times, minimizing impact on production while maintaining facility standards.',
      },
      {
        title: 'Emergency Response',
        description:
          'Available for emergency cleaning situations such as spills, equipment malfunctions, or urgent sanitation needs that require immediate attention.',
      },
    ],
    compliance: [
      'OSHA Compliant',
      'EPA Regulations',
      'Industrial Safety Trained',
      'Hazardous Waste Certified',
      'Insured & Bonded',
      'Safety Data Sheets (SDS)',
    ],
    testimonials: [
      {
        quote:
          'Anderson Cleaning understands the demands of a manufacturing environment. They work efficiently during our off-shifts and maintain the high standards our safety audits require.',
        author: 'Robert Johnson',
        company: 'Precision Manufacturing Co.',
        role: 'Plant Manager',
      },
      {
        quote:
          'The team at Anderson Cleaning is professional, reliable, and safety-conscious. They have become an essential partner in maintaining our facility and supporting our operations.',
        author: 'Linda Garcia',
        company: 'New England Distribution Center',
        role: 'Facilities Director',
      },
    ],
  },
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get industry by slug
 */
export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug)
}

/**
 * Get all industry slugs (for static path generation)
 */
export function getAllIndustrySlugs(): string[] {
  return industries.map((industry) => industry.slug)
}

/**
 * Get industry by ID
 */
export function getIndustryById(id: string): Industry | undefined {
  return industries.find((industry) => industry.id === id)
}
