'use client'

import Link from 'next/link'
import { Shield, Download, Mail } from 'lucide-react'

const pageInfo = {
  title: 'Privacy Policy | Anderson Cleaning',
  description:
    'Learn how Anderson Cleaning collects, uses, and protects your personal information.',
  robots: {
    index: false,
    follow: true,
  },
}

const lastUpdated = 'January 15, 2025'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Legal Disclaimer Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-blue-900 dark:text-blue-300">
            <Shield className="h-4 w-4" />
            <span>
              This is a legal document. For questions, contact{' '}
              <a href="mailto:privacy@andersoncleaning.com" className="underline font-medium">
                privacy@andersoncleaning.com
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last Updated: <time dateTime="2025-01-15">{lastUpdated}</time>
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Print / Save as PDF
            </button>
            <Link
              href="/legal/terms"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              View Terms of Service
            </Link>
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="mb-12 p-6 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Table of Contents
          </h2>
          <ol className="space-y-2 text-sm">
            <li>
              <a
                href="#introduction"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                1. Introduction
              </a>
            </li>
            <li>
              <a
                href="#information-we-collect"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                2. Information We Collect
              </a>
            </li>
            <li>
              <a
                href="#how-we-use-information"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                3. How We Use Information
              </a>
            </li>
            <li>
              <a
                href="#third-party-services"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                4. Third-Party Services
              </a>
            </li>
            <li>
              <a
                href="#data-retention"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                5. Data Retention
              </a>
            </li>
            <li>
              <a
                href="#your-rights"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                6. Your Rights
              </a>
            </li>
            <li>
              <a href="#contact" className="text-primary-600 dark:text-primary-400 hover:underline">
                7. Contact Us
              </a>
            </li>
            <li>
              <a href="#updates" className="text-primary-600 dark:text-primary-400 hover:underline">
                8. Updates to This Policy
              </a>
            </li>
          </ol>
        </nav>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <section id="introduction" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Anderson Cleaning, Inc. (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is
              committed to protecting your privacy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website{' '}
              <a
                href="https://andersoncleaning.com"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                andersoncleaning.com
              </a>
              , use our services, or interact with us.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We are a professional commercial cleaning and janitorial services company serving
              businesses in Western Massachusetts and Northern Connecticut. We value your trust and
              are dedicated to maintaining the confidentiality and security of your personal
              information.
            </p>
          </section>

          {/* Information We Collect */}
          <section id="information-we-collect" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">
              2.1 Contact Form Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              When you submit a contact form or request a quote, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Full name</li>
              <li>Company name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Facility address and size</li>
              <li>Service requirements and preferences</li>
              <li>Any additional information you provide in message fields</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">
              2.2 Job Application Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              When you apply for employment, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Personal information (name, contact details, address)</li>
              <li>Work history and employment references</li>
              <li>Education and professional qualifications</li>
              <li>Driver\&#39;s license and eligibility to work documentation</li>
              <li>Resume and cover letter</li>
              <li>Responses to application questions</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">
              2.3 Analytics and Usage Data
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We automatically collect certain information when you visit our website:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong>Google Analytics 4:</strong> Anonymized data about page views, session
                duration, device type, browser type, geographic location (city-level), and referral
                sources
              </li>
              <li>
                <strong>Microsoft Clarity:</strong> Session recordings and heatmaps (anonymized) to
                understand user behavior and improve website usability
              </li>
              <li>IP address (anonymized)</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on pages</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">
              2.4 Cookies and Tracking Technologies
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong>Technical Cookies:</strong> Essential for website functionality (e.g.,
                remembering your preferences, maintaining your session)
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors interact with
                our website (Google Analytics, Microsoft Clarity)
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your language preference, dark mode
                setting, and other customizations
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can control cookie preferences through your browser settings. However, disabling
              certain cookies may limit website functionality.
            </p>
          </section>

          {/* How We Use Information */}
          <section id="how-we-use-information" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              3. How We Use Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">
              3.1 Respond to Inquiries
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Reply to quote requests and contact form submissions</li>
              <li>Schedule facility walk-throughs and consultations</li>
              <li>Provide information about our services</li>
              <li>Follow up on customer inquiries</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">
              3.2 Process Job Applications
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Evaluate candidates for employment opportunities</li>
              <li>Conduct background checks and verify references (with consent)</li>
              <li>Communicate with applicants about their application status</li>
              <li>Comply with employment laws and regulations</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">
              3.3 Improve Our Website and Services
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Analyze website traffic and user behavior</li>
              <li>Identify and fix technical issues</li>
              <li>Optimize user experience and navigation</li>
              <li>Test new features and improvements</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">
              3.4 Legal Compliance
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Comply with applicable laws and regulations</li>
              <li>Respond to legal requests and prevent fraud</li>
              <li>Protect our rights and property</li>
              <li>Enforce our Terms of Service</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section id="third-party-services" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              4. Third-Party Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We use the following third-party services to operate our business. Each service has
              its own privacy policy, which we encourage you to review:
            </p>

            <div className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  HubSpot CRM
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Purpose:</strong> Lead and customer relationship management
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Data Shared:</strong> Contact information, quote requests, communication
                  history
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Privacy Policy:</strong>{' '}
                  <a
                    href="https://legal.hubspot.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    HubSpot Privacy Policy
                  </a>
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Resend
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Purpose:</strong> Transactional email delivery
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Data Shared:</strong> Email addresses, message content
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Privacy Policy:</strong>{' '}
                  <a
                    href="https://resend.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Resend Privacy Policy
                  </a>
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Google Analytics 4
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Purpose:</strong> Website analytics and performance monitoring
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Data Shared:</strong> Anonymized usage data, page views, device
                  information
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Privacy Policy:</strong>{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Google Privacy Policy
                  </a>
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Microsoft Clarity
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Purpose:</strong> Session recordings and heatmaps for UX analysis
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Data Shared:</strong> Anonymized session data, user interactions, page
                  elements
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Privacy Policy:</strong>{' '}
                  <a
                    href="https://privacy.microsoft.com/en-us/privacystatement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Microsoft Privacy Statement
                  </a>
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Crisp Chat
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Purpose:</strong> Live chat customer support
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Data Shared:</strong> Chat messages, contact information (if provided)
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Privacy Policy:</strong>{' '}
                  <a
                    href="https://crisp.chat/en/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Crisp Privacy Policy
                  </a>
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Calendly
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Purpose:</strong> Appointment and consultation scheduling
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Data Shared:</strong> Name, email, phone, appointment details
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Privacy Policy:</strong>{' '}
                  <a
                    href="https://calendly.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Calendly Privacy Notice
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section id="data-retention" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              5. Data Retention
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We retain your personal information only as long as necessary to fulfill the purposes
              outlined in this Privacy Policy:
            </p>

            <div className="space-y-4">
              <div className="p-4 border-l-4 border-primary-600 bg-gray-50 dark:bg-slate-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Lead and Customer Data
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  We retain contact information and quote requests until you request deletion or
                  become a customer. Customer data is retained for the duration of the business
                  relationship plus 3 years for legal and accounting purposes.
                </p>
              </div>

              <div className="p-4 border-l-4 border-primary-600 bg-gray-50 dark:bg-slate-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Job Applications
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Application materials are retained for 1 year from the date of submission. If you
                  are hired, your information becomes part of your employee record and is subject to
                  our employee data retention policies.
                </p>
              </div>

              <div className="p-4 border-l-4 border-primary-600 bg-gray-50 dark:bg-slate-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Analytics Data
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Analytics data (Google Analytics, Microsoft Clarity) is retained according to each
                  service\&#39;s default retention periods: 14 months for Google Analytics 4, and 30
                  days for Microsoft Clarity session recordings.
                </p>
              </div>

              <div className="p-4 border-l-4 border-primary-600 bg-gray-50 dark:bg-slate-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Cookies
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Cookies expire based on their type: session cookies expire when you close your
                  browser, while persistent cookies may last up to 2 years or until you delete them.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section id="your-rights" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              6. Your Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Access and Correction
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You have the right to access the personal information we hold about you and
                  request corrections if it is inaccurate or incomplete. Contact us at{' '}
                  <a
                    href="mailto:privacy@andersoncleaning.com"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    privacy@andersoncleaning.com
                  </a>{' '}
                  to make a request.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Deletion
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You may request that we delete your personal information, subject to legal and
                  contractual retention requirements. We will respond to deletion requests within 30
                  days.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Opt-Out of Marketing
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You can opt out of receiving marketing communications at any time by clicking the
                  &quot;unsubscribe&quot; link in our emails or contacting us directly. This will
                  not affect transactional emails (e.g., quote confirmations, appointment
                  reminders).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Cookie Preferences
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You can control cookies through your browser settings. Most browsers allow you to
                  block or delete cookies. Note that blocking certain cookies may impact website
                  functionality. To opt out of Google Analytics, visit{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Do Not Track
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our website does not currently respond to &quot;Do Not Track&quot; (DNT) browser
                  signals. However, you can control tracking through the methods described above.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              7. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Privacy Inquiries
                    </p>
                    <a
                      href="mailto:privacy@andersoncleaning.com"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      privacy@andersoncleaning.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      General Inquiries
                    </p>
                    <a
                      href="mailto:info@andersoncleaning.com"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      info@andersoncleaning.com
                    </a>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-slate-700">
                  <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    Mailing Address
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Anderson Cleaning, Inc.
                    <br />
                    103 Wayside Ave
                    <br />
                    West Springfield, MA 01089
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section id="updates" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              8. Updates to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our
              practices, technology, legal requirements, or other factors. When we make material
              changes, we will:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Update the &quot;Last Updated&quot; date at the top of this page</li>
              <li>Notify you via email if you have an active account or ongoing inquiry with us</li>
              <li>
                Post a notice on our website homepage for 30 days after the change takes effect
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We encourage you to review this Privacy Policy periodically. Your continued use of our
              website and services after changes are posted constitutes your acceptance of the
              updated policy.
            </p>
          </section>

          {/* Version History */}
          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
              Version History
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
              <li>
                <strong>Version 1.0</strong> - {lastUpdated}: Initial publication
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            font-size: 12pt;
            line-height: 1.5;
          }
          h1 {
            font-size: 24pt;
          }
          h2 {
            font-size: 18pt;
            page-break-after: avoid;
          }
          h3 {
            font-size: 14pt;
            page-break-after: avoid;
          }
          section {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}
