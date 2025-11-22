import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Calendar, Clock, ArrowLeft, Share2, CheckCircle2, AlertTriangle } from 'lucide-react'

const blogContent: { [key: string]: any } = {
  'office-cleaning-checklist-flu-season': {
    title: 'Office Cleaning Checklist for Flu Season',
    category: 'Health & Safety',
    readTime: '5 min read',
    publishedDate: '2024-10-15',
    author: 'Anderson Cleaning Team',
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=1200&q=80',
    content: `
      <h2>Protecting Your Workplace During Flu Season</h2>
      <p>Flu season typically runs from October through March, with peak activity occurring between December and February. During this time, maintaining a rigorous cleaning and disinfection schedule is crucial for protecting employee health and maintaining productivity.</p>

      <h2>High-Touch Areas That Need Daily Attention</h2>
      <p>These surfaces should be cleaned and disinfected at least once daily, or more frequently in high-traffic facilities:</p>
      <ul>
        <li><strong>Door handles and push plates</strong> - Entry doors, office doors, restroom doors</li>
        <li><strong>Light switches</strong> - All common areas and individual offices</li>
        <li><strong>Elevator buttons</strong> - Both inside and outside the elevator</li>
        <li><strong>Stair railings</strong> - Especially in buildings with multiple floors</li>
        <li><strong>Reception desks and counters</strong> - Where visitors and employees interact</li>
        <li><strong>Shared equipment</strong> - Copiers, printers, coffee makers, microwaves</li>
        <li><strong>Phones and keyboards</strong> - In shared workspaces and conference rooms</li>
        <li><strong>Conference room tables and chairs</strong> - Before and after meetings</li>
        <li><strong>Restroom fixtures</strong> - Faucets, soap dispensers, paper towel dispensers</li>
      </ul>

      <h2>EPA-Registered Disinfectants: What You Need to Know</h2>
      <p>Not all cleaning products kill viruses. The CDC recommends using EPA-registered disinfectants that are effective against influenza. Our team uses hospital-grade disinfectants with the following characteristics:</p>
      <ul>
        <li>EPA-registered with specific kill claims for influenza A and B viruses</li>
        <li>Appropriate contact time (typically 1-10 minutes depending on the product)</li>
        <li>Safe for use on the intended surface types</li>
        <li>Compatible with your facility's sustainability goals when possible</li>
      </ul>

      <h2>Proper Disinfection Technique</h2>
      <p>Simply spraying disinfectant isn't enough. Proper technique involves:</p>
      <ol>
        <li><strong>Pre-cleaning</strong> - Remove visible dirt and debris first</li>
        <li><strong>Apply disinfectant</strong> - Spray or wipe to thoroughly wet the surface</li>
        <li><strong>Wait for contact time</strong> - Leave the surface wet for the time specified on the label</li>
        <li><strong>Air dry or wipe</strong> - Follow product instructions</li>
      </ol>

      <h2>Restroom Deep Cleaning During Flu Season</h2>
      <p>Restrooms are high-risk areas that require extra attention:</p>
      <ul>
        <li>Disinfect all touchpoints multiple times daily</li>
        <li>Ensure soap dispensers are always full</li>
        <li>Check hand dryers and paper towel dispensers frequently</li>
        <li>Empty waste bins more frequently to prevent overflow</li>
        <li>Deep clean floors daily with appropriate disinfectant</li>
      </ul>

      <h2>Break Room & Kitchen Areas</h2>
      <p>Shared food areas can be breeding grounds for germs:</p>
      <ul>
        <li>Wipe down refrigerator handles, microwave keypads, and coffee maker buttons</li>
        <li>Sanitize countertops before and after peak usage times</li>
        <li>Clean sink faucets and handles multiple times daily</li>
        <li>Disinfect tables and chairs after lunch periods</li>
        <li>Empty and sanitize trash bins daily</li>
      </ul>

      <h2>Air Quality Considerations</h2>
      <p>Good ventilation helps reduce airborne virus transmission:</p>
      <ul>
        <li>Ensure HVAC filters are changed regularly (every 1-3 months)</li>
        <li>Consider upgrading to MERV 13 or higher filters</li>
        <li>Increase fresh air circulation when possible</li>
        <li>Use air purifiers in high-occupancy areas</li>
      </ul>

      <h2>Employee Workstations</h2>
      <p>While employees should clean their own desks, cleaning services should:</p>
      <ul>
        <li>Provide disinfecting wipes for individual use</li>
        <li>Empty waste bins daily</li>
        <li>Vacuum or sweep floors regularly</li>
        <li>Wipe down shared surfaces like cubicle walls or partitions</li>
      </ul>

      <h2>Special Considerations for Medical Offices</h2>
      <p>If you operate a medical facility, additional protocols apply:</p>
      <ul>
        <li>Use medical-grade disinfectants approved for healthcare settings</li>
        <li>Follow OSHA bloodborne pathogen standards</li>
        <li>Clean exam rooms between each patient</li>
        <li>Maintain detailed cleaning logs</li>
        <li>Use color-coded cleaning supplies to prevent cross-contamination</li>
      </ul>

      <h2>Monitoring and Documentation</h2>
      <p>Professional cleaning companies should provide:</p>
      <ul>
        <li>Daily cleaning checklists signed by cleaners</li>
        <li>Temperature checks and product dilution logs</li>
        <li>Restocking reports for supplies</li>
        <li>Quality audit results</li>
        <li>Any issues or concerns noted during cleaning</li>
      </ul>

      <h2>When to Increase Cleaning Frequency</h2>
      <p>Consider stepping up your cleaning schedule if:</p>
      <ul>
        <li>Multiple employees call in sick with flu-like symptoms</li>
        <li>Local flu activity is reported as "high" or "very high"</li>
        <li>You host clients or visitors from areas with high flu rates</li>
        <li>Your facility has vulnerable populations (elderly, immunocompromised)</li>
      </ul>

      <div class="callout">
        <h3>Need Professional Flu Season Cleaning?</h3>
        <p>Anderson Cleaning specializes in health-focused cleaning protocols that protect your employees during flu season and year-round. Our team is trained in proper disinfection techniques, uses EPA-registered products, and provides documentation for your peace of mind.</p>
        <p><strong>Contact us today for a free consultation and customized cleaning plan.</strong></p>
      </div>
    `,
  },
  'commercial-cleaning-frequency-guide': {
    title: 'How Often Should Your Office Be Professionally Cleaned?',
    category: 'Best Practices',
    readTime: '7 min read',
    publishedDate: '2024-09-22',
    author: 'Anderson Cleaning Team',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
    content: `
      <h2>Start with Foot Traffic and Risk</h2>
      <p>Cleaning frequency should reflect how your facility is used. Professional offices with steady traffic have different needs than call centers, dispatch hubs, or medical suites. We group spaces into four categories:</p>
      <ul>
        <li><strong>Mission-critical areas</strong> – executive suites, client-facing conference rooms, medical operatories</li>
        <li><strong>High-traffic support spaces</strong> – open workstations, break rooms, elevator lobbies</li>
        <li><strong>Specialty zones</strong> – server rooms, labs, equipment closets</li>
        <li><strong>Back-of-house</strong> – storage rooms, loading docks, maintenance corridors</li>
      </ul>

      <h2>Daily vs. Weekly Programs</h2>
      <p>At Anderson Cleaning we design custom SOPs for each account, but these guidelines help you set expectations:</p>
      <ol>
        <li><strong>Daily cleaning</strong> for reception, client areas, restrooms, break rooms, and any space where spills or trash accumulate quickly.</li>
        <li><strong>Three to five times per week</strong> for open work areas, private offices, and high-touch surfaces to maintain health and visual appeal.</li>
        <li><strong>Weekly detail services</strong> such as glass polishing, dusting high ledges, disinfecting phones, and vacuuming upholstered furniture.</li>
      </ol>

      <h2>Monthly and Quarterly Deep Work</h2>
      <p>Even when you run a daily program, scheduled deep cleaning prevents long-term wear:</p>
      <ul>
        <li>Machine scrubbing or burnishing hard floors</li>
        <li>Carpet extraction and stain removal</li>
        <li>Detail cleaning of vents, baseboards, and interior windows</li>
        <li>Inventory checks for consumable products</li>
      </ul>

      <h2>Signals You Need to Increase Frequency</h2>
      <p>Consider upgrading your program if you notice:</p>
      <ul>
        <li>Frequent complaints about restrooms or break rooms</li>
        <li>Visible dust on horizontal surfaces within 24 hours of cleaning</li>
        <li>Trash bins overflowing midday</li>
        <li>Persistent odors or sticky floors even after nightly service</li>
        <li>More than one unscheduled service request per week</li>
      </ul>

      <h2>How Anderson Cleaning Builds the Schedule</h2>
      <p>During our walkthrough we document square footage, floor types, occupant density, and regulatory requirements. Then we build a cleaning matrix that outlines:</p>
      <ul>
        <li>Daily tasks (restroom sanitation, trash removal, high-touch disinfection)</li>
        <li>Weekly tasks (detailed dusting, conference room resets, interior glass)</li>
        <li>Monthly/quarterly tasks (floor maintenance, upholstery cleaning, vent dusting)</li>
        <li>Seasonal projects (window washing, exterior walk-off mat service)</li>
      </ul>

      <div class="callout">
        <h3>Need Help Setting the Right Cadence?</h3>
        <p>Our office cleaning and janitorial programs combine daily attention with scheduled deep services, so your facility stays inspection-ready. We’ll build a frequency plan based on traffic, risk, and budget.</p>
        <p><strong>Contact Anderson Cleaning for a walkthrough and custom cleaning matrix.</strong></p>
      </div>
    `,
  },
  'medical-facility-cleaning-standards': {
    title: 'Medical Facility Cleaning: Meeting OSHA & CDC Standards',
    category: 'Healthcare',
    readTime: '8 min read',
    publishedDate: '2024-09-10',
    author: 'Anderson Cleaning Team',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1200&q=80',
    content: `
      <h2>Why Healthcare Cleaning Is Different</h2>
      <p>Medical environments must control pathogens, protect patient privacy, and support accreditation audits. That means cleaning isn’t just about appearance—it’s about compliance. Our healthcare teams follow OSHA Bloodborne Pathogens Standard, CDC guidelines for healthcare facilities, and state-specific regulations.</p>

      <h2>Core Protocols We Implement</h2>
      <ul>
        <li><strong>EPA List N disinfectants:</strong> Hospital-grade products with documented dwell times.</li>
        <li><strong>Color-coded microfiber:</strong> Prevents cross-contamination between exam rooms, restrooms, and public spaces.</li>
        <li><strong>Documented SOPs:</strong> Every zone has a written procedure, frequency, and verification step.</li>
        <li><strong>Sharps and biohazard awareness:</strong> Staff are trained to identify and escalate incidents immediately.</li>
      </ul>

      <h2>Exam Rooms and Procedure Areas</h2>
      <p>We disinfect patient contact surfaces between visits and perform terminal cleaning after scheduled procedures. Checklist items include:</p>
      <ul>
        <li>Exam beds, armrests, and diagnostic equipment</li>
        <li>Drawer handles, cabinet pulls, and light switches</li>
        <li>Countertops, sinks, and splash zones</li>
        <li>Trash removal with regulated waste protocols</li>
      </ul>

      <h2>Public Spaces Matter Too</h2>
      <p>Waiting rooms, corridors, and restrooms create first impressions and can become infection reservoirs if neglected. We focus on:</p>
      <ul>
        <li>High-frequency disinfection of seating, check-in kiosks, and door hardware</li>
        <li>Continuous restocking of consumables</li>
        <li>Daily floor care to prevent slips and maintain cleanliness</li>
      </ul>

      <h2>Verification and Reporting</h2>
      <p>Healthcare administrators need proof of performance. Anderson Cleaning provides:</p>
      <ul>
        <li>Digital inspection reports with timestamped photos</li>
        <li>ATP testing (available for sensitive areas)</li>
        <li>Corrective action logs and 24/7 escalation paths</li>
        <li>Support during Joint Commission or state health inspections</li>
      </ul>

      <div class="callout">
        <h3>Partner with a Healthcare Cleaning Specialist</h3>
        <p>We serve medical offices, outpatient clinics, imaging centers, and surgical suites within 100 miles of West Springfield. Our OSHA-trained teams deliver compliant cleaning backed by documented QA.</p>
        <p><strong>Schedule a healthcare-specific walkthrough with Anderson Cleaning.</strong></p>
      </div>
    `,
  },
  'choosing-commercial-cleaning-company': {
    title: '10 Questions to Ask Before Hiring a Commercial Cleaning Company',
    category: "Buyer's Guide",
    readTime: '10 min read',
    publishedDate: '2024-08-28',
    author: 'Anderson Cleaning Team',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80',
    content: `
      <h2>Set Expectations Before You Bid</h2>
      <p>A polished proposal doesn’t guarantee reliable service. Ask these ten questions to separate professional providers from the rest.</p>

      <h2>1. Are cleaners W-2 employees or contractors?</h2>
      <p>Employee-based models (like Anderson’s) allow consistent training, background checks, and benefits. Contractors can create gaps in accountability.</p>

      <h2>2. What is your onboarding process?</h2>
      <p>Look for documented walkthroughs, custom SOPs, and a formal transition plan—especially if you’re switching vendors mid-contract.</p>

      <h2>3. Can you provide proof of insurance?</h2>
      <p>Request certificates for general liability, workers’ compensation, and umbrella coverage. Confirm limits meet your landlord or corporate requirements.</p>

      <h2>4. How do you handle staffing shortages?</h2>
      <p>Professional firms maintain float teams and cross-train employees so absences don’t derail your cleaning schedule.</p>

      <h2>5. What is the communication structure?</h2>
      <p>Ask where you submit requests, how quickly you’ll get a response, and who performs inspections.</p>

      <h2>6. Which chemicals and equipment do you use?</h2>
      <p>Providers should specify EPA-registered disinfectants, HEPA vacuums, and microfiber systems—and be able to supply SDS sheets on request.</p>

      <h2>7. How do you protect keys, badges, and alarm codes?</h2>
      <p>Your vendor should have chain-of-custody procedures and secure storage for credentials.</p>

      <h2>8. Do you offer specialty services?</h2>
      <p>Floor care, carpet extraction, window cleaning, and supply management should be available as add-ons so you’re not coordinating multiple vendors.</p>

      <h2>9. Can you share references in my industry?</h2>
      <p>Testimonials from similar facilities—medical, corporate, education—prove the team understands your compliance needs.</p>

      <h2>10. What happens if we’re not satisfied?</h2>
      <p>Look for service-level guarantees, corrective action timelines, and an easy exit clause if things go sideways.</p>

      <div class="callout">
        <h3>Interview Anderson Cleaning</h3>
        <p>We welcome tough questions because transparency is part of our DNA. From W-2 staffing to digital QA, we show you exactly how we protect your facility.</p>
        <p><strong>Book a discovery call and put our answers to the test.</strong></p>
      </div>
    `,
  },
  'floor-care-maintenance-tips': {
    title: 'Extending the Life of Commercial Flooring: Care & Maintenance',
    category: 'Maintenance',
    readTime: '6 min read',
    publishedDate: '2024-08-15',
    author: 'Anderson Cleaning Team',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
    content: `
      <h2>Start with Daily Protection</h2>
      <p>Hard floors fail prematurely when grit and moisture grind into the finish. The first defense is walk-off matting and daily dust mopping.</p>
      <ul>
        <li><strong>Entry mats:</strong> Use at least 15 feet of matting indoors to capture debris.</li>
        <li><strong>Dust mop daily:</strong> Microfiber dust mops lift fine particles without scratching.</li>
        <li><strong>Spot mop spills immediately:</strong> Moisture seeps into seams and adhesives if left unattended.</li>
      </ul>

      <h2>Weekly and Monthly Maintenance</h2>
      <p>Schedule wet mopping with neutral cleaner and machine scrubbing as needed:</p>
      <ul>
        <li>Neutral pH cleaner for LVT, VCT, and sealed concrete</li>
        <li>Auto-scrubbing high-traffic zones weekly</li>
        <li>Re-applying finish or conditioner before dulling occurs</li>
      </ul>

      <h2>Quarterly & Annual Projects</h2>
      <p>Depending on traffic, most facilities need:</p>
      <ul>
        <li>Strip and refinish VCT one to two times per year</li>
        <li>Burnish finished floors monthly or quarterly</li>
        <li>Deep clean carpets every 3-6 months to remove embedded soils</li>
        <li>Use encapsulation or hot water extraction based on manufacturer specs</li>
      </ul>

      <h2>Protect Specialty Surfaces</h2>
      <p>Executive suites and branded environments often feature marble, terrazzo, or polished concrete. These surfaces require:</p>
      <ul>
        <li>pH-neutral cleaners (never acidic products)</li>
        <li>Periodic honing and polishing to restore clarity</li>
        <li>Impregnating sealers for stain resistance</li>
        <li>Dedicated pads and equipment to avoid cross-contamination</li>
      </ul>

      <h2>How Anderson Cleans Smarter</h2>
      <p>Our floor-care technicians use auto-scrubbers, burnishers, orbital machines, and moisture-controlled carpet systems. We build seasonal calendars so you know when each process will occur, and we document product batches for warranty compliance.</p>

      <div class="callout">
        <h3>Need a Floor Care Program?</h3>
        <p>From nightly maintenance to full strip-and-refinish services, Anderson Cleaning protects the flooring investments in offices, schools, and healthcare facilities.</p>
        <p><strong>Request a floor assessment and maintenance schedule today.</strong></p>
      </div>
    `,
  },
  'benefits-green-cleaning-workplace': {
    title: 'Benefits of Green Cleaning in the Workplace',
    category: 'Sustainability',
    readTime: '6 min read',
    publishedDate: '2024-10-08',
    author: 'Anderson Cleaning Team',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1200&q=80',
    content: `
      <h2>Why Green Cleaning Matters for Your Business</h2>
      <p>Green cleaning isn't just about being environmentally responsible—it's about creating healthier workspaces, improving employee well-being, and demonstrating your company's commitment to sustainability. Modern eco-friendly cleaning products are just as effective as traditional chemicals, without the harmful side effects.</p>

      <h2>Health Benefits of Green Cleaning</h2>

      <h3>Improved Indoor Air Quality</h3>
      <p>Traditional cleaning products release volatile organic compounds (VOCs) that can linger in indoor air for hours or even days. Green cleaning products are low-VOC or VOC-free, which means:</p>
      <ul>
        <li>Reduced respiratory irritation and allergic reactions</li>
        <li>Fewer headaches and dizziness complaints</li>
        <li>Better air quality for employees with asthma or chemical sensitivities</li>
        <li>More pleasant working environment without harsh chemical odors</li>
      </ul>

      <h3>Reduced Sick Days</h3>
      <p>Studies have shown that workplaces using green cleaning products experience:</p>
      <ul>
        <li>Up to 13% reduction in employee sick days</li>
        <li>Fewer respiratory complaints</li>
        <li>Lower rates of skin irritation</li>
        <li>Improved overall employee health and well-being</li>
      </ul>

      <h3>Safer for Cleaning Staff</h3>
      <p>Professional cleaners are exposed to cleaning products daily. Green products protect their health by:</p>
      <ul>
        <li>Eliminating exposure to harsh chemicals and fumes</li>
        <li>Reducing risk of chemical burns or irritation</li>
        <li>Decreasing long-term health risks</li>
        <li>Creating a safer working environment</li>
      </ul>

      <h2>Environmental Benefits</h2>

      <h3>Reduced Water Pollution</h3>
      <p>Green cleaning products are biodegradable and phosphate-free, which means:</p>
      <ul>
        <li>Less harmful runoff into waterways</li>
        <li>Reduced impact on aquatic ecosystems</li>
        <li>Lower contribution to algae blooms and dead zones</li>
        <li>Protection of local water quality</li>
      </ul>

      <h3>Decreased Carbon Footprint</h3>
      <p>Many green cleaning products feature:</p>
      <ul>
        <li>Concentrated formulas that reduce packaging and transportation</li>
        <li>Recyclable or biodegradable packaging</li>
        <li>Manufacturing processes with lower energy consumption</li>
        <li>Locally-sourced ingredients when possible</li>
      </ul>

      <h2>Business Benefits</h2>

      <h3>Enhanced Corporate Image</h3>
      <p>Implementing green cleaning demonstrates your commitment to:</p>
      <ul>
        <li>Environmental stewardship</li>
        <li>Employee health and safety</li>
        <li>Corporate social responsibility</li>
        <li>Sustainable business practices</li>
      </ul>

      <h3>LEED Certification Support</h3>
      <p>If your facility is pursuing LEED (Leadership in Energy and Environmental Design) certification, green cleaning can contribute points in:</p>
      <ul>
        <li>Indoor Environmental Quality credits</li>
        <li>Innovation in Operations</li>
        <li>Green Cleaning Policy development</li>
        <li>Ongoing performance monitoring</li>
      </ul>

      <h3>Cost-Effectiveness</h3>
      <p>While some green products have higher upfront costs, they often provide savings through:</p>
      <ul>
        <li>Concentrated formulas that last longer</li>
        <li>Reduced sick days and associated costs</li>
        <li>Lower liability from chemical exposure</li>
        <li>Potential insurance premium reductions</li>
      </ul>

      <h2>What Makes a Product "Green"?</h2>
      <p>Look for certifications from reputable third-party organizations:</p>
      <ul>
        <li><strong>Green Seal</strong> - Independent non-profit that certifies environmentally responsible products</li>
        <li><strong>EPA Safer Choice</strong> - Products with safer chemical ingredients</li>
        <li><strong>EcoLogo</strong> - Multi-attribute environmental certification</li>
        <li><strong>Cradle to Cradle Certified</strong> - Products designed for circular economy</li>
      </ul>

      <h2>Green Cleaning Practices Beyond Products</h2>
      <p>True green cleaning involves more than just products:</p>

      <h3>Microfiber Technology</h3>
      <ul>
        <li>Captures 99% of dirt and bacteria without chemicals</li>
        <li>Reusable for hundreds of washes</li>
        <li>Reduces water and chemical usage</li>
        <li>More effective than traditional cotton mops and rags</li>
      </ul>

      <h3>HEPA Filtration Vacuums</h3>
      <ul>
        <li>Traps 99.97% of particles 0.3 microns or larger</li>
        <li>Prevents dust and allergens from recirculating</li>
        <li>Improves indoor air quality</li>
        <li>Especially important for medical offices and schools</li>
      </ul>

      <h3>Proper Dilution and Usage</h3>
      <ul>
        <li>Automated dispensing systems ensure correct dilution</li>
        <li>Reduces chemical waste</li>
        <li>Improves product effectiveness</li>
        <li>Lowers overall chemical consumption</li>
      </ul>

      <h2>Common Myths About Green Cleaning</h2>

      <h3>Myth: Green products don't work as well</h3>
      <p><strong>Reality:</strong> Modern green cleaning products are formulated to meet or exceed the performance of traditional chemicals. Third-party certifications ensure effectiveness.</p>

      <h3>Myth: Green cleaning is much more expensive</h3>
      <p><strong>Reality:</strong> When you factor in health benefits, reduced sick days, and concentrated formulas, green cleaning is often cost-neutral or even saves money long-term.</p>

      <h3>Myth: All "natural" products are safe</h3>
      <p><strong>Reality:</strong> "Natural" isn't regulated and doesn't guarantee safety. Look for third-party certifications like Green Seal or EPA Safer Choice.</p>

      <h2>Implementing Green Cleaning in Your Facility</h2>
      <p>Steps to transition to green cleaning:</p>
      <ol>
        <li><strong>Audit current products</strong> - Identify which products can be replaced</li>
        <li><strong>Choose certified products</strong> - Look for reputable third-party certifications</li>
        <li><strong>Train cleaning staff</strong> - Ensure proper usage and dilution</li>
        <li><strong>Educate employees</strong> - Communicate the benefits and changes</li>
        <li><strong>Monitor results</strong> - Track air quality, employee satisfaction, and costs</li>
        <li><strong>Continuously improve</strong> - Stay updated on new products and practices</li>
      </ol>

      <div class="callout">
        <h3>Ready to Go Green?</h3>
        <p>Anderson Cleaning offers comprehensive green cleaning programs using certified eco-friendly products and sustainable practices. We can help your facility achieve environmental goals while maintaining the highest cleanliness standards.</p>
        <p><strong>Contact us for a free green cleaning consultation.</strong></p>
      </div>
    `,
  },
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogContent[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900">
      {/* Article Header */}
      <article className="pt-28 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Article Meta */}
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-brand-emerald text-white text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-h1 md:text-h1 font-extrabold text-neutral-charcoal dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-neutral-charcoal/70 dark:text-neutral-charcoal/50 mb-8">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(post.publishedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {post.readTime}
              </div>
              <div className="flex items-center">
                By {post.author}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 pb-8 border-b border-neutral-light-grey dark:border-slate-700">
              <span className="text-sm font-medium text-neutral-charcoal/80 dark:text-white/80">Share:</span>
              <button className="p-2 rounded-lg hover:bg-neutral-light-grey dark:hover:bg-slate-800 transition-colors" aria-label="Share this article">
                <Share2 className="h-5 w-5 text-neutral-charcoal/70 dark:text-white/70" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-96 bg-neutral-light-grey dark:bg-slate-800 my-12">
          <Image
            src={post.image}
            alt={post.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            quality={90}
          />
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-neutral-charcoal dark:prose-headings:text-white prose-h2:text-h2 prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-h3 prose-h3:mt-8 prose-h3:mb-4 prose-p:text-neutral-charcoal/80 dark:prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6 prose-ul:my-6 prose-ul:space-y-2 prose-li:text-neutral-charcoal/80 dark:prose-li:text-white/80 prose-strong:text-neutral-charcoal dark:prose-strong:text-white prose-a:text-brand-emerald dark:prose-a:text-brand-emerald prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <style
              dangerouslySetInnerHTML={{
                __html: `
                  .callout {
                    background: #ffffff;
                    border: 1px solid #dfe2e6;
                    border-left: 4px solid #00A57E;
                    border-radius: 0.75rem;
                    padding: 2rem;
                    margin: 3rem 0;
                  }
                  .dark .callout {
                    background: #0A2342;
                    border-color: rgba(255,255,255,0.15);
                    border-left-color: #00A57E;
                  }
                  .callout h3 {
                    color: #0A2342;
                    margin-top: 0 !important;
                    margin-bottom: 1rem;
                  }
                  .dark .callout h3 {
                    color: #ffffff;
                  }
                  .callout p {
                    color: #1A1A1A;
                    margin-bottom: 0.5rem;
                  }
                  .dark .callout p {
                    color: #ffffffcc;
                  }
                `,
              }}
            />
          </div>
        </div>

        {/* Related Articles CTA */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-2xl p-8 text-center">
              <h2 className="text-h3 leading-normal font-bold text-neutral-charcoal dark:text-white mb-4">
                Need Professional Cleaning Services?
              </h2>
              <p className="text-body text-neutral-charcoal/70 dark:text-white/80 mb-6">
                Anderson Cleaning provides expert commercial cleaning services throughout Western MA
                and Northern CT.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote">
                  <Button variant="primary" size="lg">
                    Get a Free Quote
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" size="lg">
                    Read More Articles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
