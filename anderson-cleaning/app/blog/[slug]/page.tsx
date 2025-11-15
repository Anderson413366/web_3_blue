'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
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

export default function BlogPost() {
  const params = useParams()
  const slug = params?.slug as string

  const post = blogContent[slug] || blogContent['office-cleaning-checklist-flu-season']

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Article Header */}
      <article className="py-12">
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
              <span className="inline-block px-3 py-1 bg-accent-500 text-white text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
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
            <div className="flex items-center gap-4 pb-8 border-b border-gray-200 dark:border-slate-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Share:</span>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full h-96 bg-gray-200 dark:bg-slate-800 my-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                prose-ul:my-6 prose-ul:space-y-2
                prose-li:text-gray-700 dark:prose-li:text-gray-300
                prose-strong:text-gray-900 dark:prose-strong:text-white
                prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <style jsx global>{`
              .callout {
                background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
                border-left: 4px solid #3b82f6;
                border-radius: 0.5rem;
                padding: 2rem;
                margin: 3rem 0;
              }
              .dark .callout {
                background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
                border-left-color: #60a5fa;
              }
              .callout h3 {
                color: #1e40af;
                margin-top: 0 !important;
                margin-bottom: 1rem;
              }
              .dark .callout h3 {
                color: #93c5fd;
              }
              .callout p {
                color: #1e40af;
                margin-bottom: 0.5rem;
              }
              .dark .callout p {
                color: #dbeafe;
              }
            `}</style>
          </div>
        </div>

        {/* Related Articles CTA */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Need Professional Cleaning Services?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
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
