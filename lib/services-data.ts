export interface ServiceData {
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

export const servicesData: Record<string, ServiceData> = {
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
          'Floor care services are premium add-ons for our regular cleaning clients. This ensures we can properly schedule and resource the work.',
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
        question: 'Do you provide interior and exterior cleaning?',
        answer:
          'Yes, our teams are trained and equipped for both interior and exterior cleaning, including high-rise exteriors.',
      },
      {
        question: 'How do you ensure safety?',
        answer:
          'We use OSHA-compliant harnesses, lifts, and safety protocols. All technicians undergo regular safety training.',
      },
      {
        question: 'What about weather delays?',
        answer:
          "We monitor weather closely. Exterior cleaning may be rescheduled during heavy rain or high winds, but interior cleaning can proceed as scheduled.",
      },
    ],
  },
  'post-construction': {
    title: 'Post-Construction Cleaning',
    icon: '🏗️',
    tagline: 'Move-in ready results after renovation or build-outs',
    heroDescription:
      'Detailed post-construction cleaning services that remove dust, debris, and residue so your space looks pristine for opening day.',
    availability: 'contracted',
    benefits: [
      'Specialized crews trained in post-construction cleaning',
      'HEPA-filter vacuums for fine dust removal',
      'Detailed surface cleaning and polishing',
      'Debris removal and disposal coordination',
      'Flexible scheduling, including nights and weekends',
      'Final walkthrough with project manager',
    ],
    process: [
      {
        step: 1,
        title: 'Project Review',
        description: 'Walk-through to understand construction scope and schedule.',
      },
      {
        step: 2,
        title: 'Phase Planning',
        description: 'Plan cleaning stages (rough clean, light clean, final clean) as needed.',
      },
      {
        step: 3,
        title: 'Dust & Debris Removal',
        description: 'Remove large debris, vacuum dust with HEPA filters, and clean surfaces.',
      },
      {
        step: 4,
        title: 'Detail Cleaning',
        description: 'Clean fixtures, glass, floors, and surfaces to show-ready condition.',
      },
      {
        step: 5,
        title: 'Final Polish',
        description: 'Touch-up work, spot cleaning, and final walkthrough with client.',
      },
    ],
    included: [
      'HEPA vacuuming of ceilings, walls, and floors',
      'Dust removal from vents and fixtures',
      'Interior window and glass cleaning',
      'Floor scrubbing, polishing, or carpet cleaning',
      'Restroom and kitchen sanitizing',
      'Debris collection and disposal coordination',
      'Protective film removal from surfaces',
      'Final detailing and touch-ups',
      'Project manager walkthrough',
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
          'Post-construction cleaning is a premium add-on for our regular cleaning clients. This ensures proper scheduling and resource allocation.',
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
