'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TermsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Agreement to Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By accessing or using Anderson Cleaning's website or services, you agree to be bound by these
                Terms of Service and all applicable laws and regulations. If you do not agree with any of these
                terms, you are prohibited from using our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Services Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Anderson Cleaning provides commercial cleaning services including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Office and commercial cleaning</li>
                <li>Janitorial services</li>
                <li>Floor and carpet care</li>
                <li>Window cleaning</li>
                <li>Post-construction cleanup</li>
                <li>Supply management</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Specific services are detailed in individual service agreements between Anderson Cleaning and
                the client.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Service Agreements
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Commercial cleaning services are provided under written service agreements that specify:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Scope of work and service frequency</li>
                <li>Pricing and payment terms</li>
                <li>Service schedules and access requirements</li>
                <li>Termination clauses and notice periods</li>
                <li>Insurance and liability provisions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Client Responsibilities
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Clients agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Provide safe and reasonable access to facilities during scheduled service times</li>
                <li>Notify us of any hazardous conditions or special requirements</li>
                <li>Provide secure storage for cleaning equipment and supplies</li>
                <li>Make timely payments according to agreed-upon terms</li>
                <li>Communicate concerns or issues promptly</li>
                <li>Maintain adequate security systems and protocols</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Payment Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Unless otherwise specified in your service agreement:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Invoices are issued monthly for regular cleaning services</li>
                <li>Payment is due within 30 days of invoice date</li>
                <li>Late payments may incur a service charge of 1.5% per month</li>
                <li>Services may be suspended for accounts more than 60 days past due</li>
                <li>Project work may require a deposit before commencement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Insurance and Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Anderson Cleaning maintains:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Comprehensive general liability insurance</li>
                <li>Workers' compensation insurance for all employees</li>
                <li>Commercial auto insurance for company vehicles</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Certificate of insurance is available upon request. Claims for damages must be reported within
                48 hours of occurrence.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Anderson Cleaning's liability is limited to the greater of: (1) the amount paid for services in
                the month when the incident occurred, or (2) our insurance coverage limits. We are not liable
                for indirect, incidental, or consequential damages including lost profits, business interruption,
                or data loss.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Service Modifications and Cancellations
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Service changes require:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>24-hour notice for single-day schedule changes</li>
                <li>Written notice for permanent service modifications</li>
                <li>30-day written notice for contract termination (unless otherwise specified)</li>
                <li>Payment of outstanding invoices before final termination</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Quality Assurance
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We are committed to quality service. If you are unsatisfied with our work:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Contact us within 24 hours of service</li>
                <li>We will return to address the issue within 24 hours</li>
                <li>No charge for corrective cleaning within 24 hours of original service</li>
                <li>Issues reported after 24 hours may incur additional charges</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Confidentiality
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Anderson Cleaning agrees to maintain confidentiality of all information encountered during
                service delivery, including but not limited to business operations, proprietary information,
                and security protocols. Our staff are trained in confidentiality requirements and sign
                non-disclosure agreements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Force Majeure
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Anderson Cleaning is not liable for failure to perform services due to circumstances beyond
                our reasonable control, including natural disasters, severe weather, public health emergencies,
                labor disputes, or governmental actions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Dispute Resolution
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                In the event of a dispute:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Client will first attempt to resolve the issue directly with their account manager</li>
                <li>If unresolved, the dispute will be escalated to management for review</li>
                <li>Disputes not resolved within 30 days may be submitted to mediation</li>
                <li>All disputes are governed by the laws of Massachusetts</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Website Use
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Use our website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our website or servers</li>
                <li>Collect information about other users without consent</li>
                <li>Transmit viruses, malware, or harmful code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Intellectual Property
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the
                property of Anderson Cleaning and protected by copyright and trademark laws. You may not
                reproduce, distribute, or create derivative works without written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Changes to Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective
                immediately upon posting to our website. Your continued use of our services after changes are
                posted constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Questions about these Terms of Service? Contact us:
              </p>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Anderson Cleaning</strong><br />
                  103 Wayside Avenue<br />
                  West Springfield, MA 01089<br />
                  <br />
                  Email:{' '}
                  <a href="mailto:info@andersoncleaning.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                    info@andersoncleaning.com
                  </a>
                  <br />
                  Phone:{' '}
                  <a href="tel:+15551234567" className="text-primary-600 dark:text-primary-400 hover:underline">
                    (555) 123-4567
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
