'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last Updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Anderson Cleaning ("we," "our," or "us") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Personal Information
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>Request a quote or contact us</li>
                <li>Fill out a form on our website</li>
                <li>Subscribe to our newsletter</li>
                <li>Apply for employment</li>
                <li>Engage with our services</li>
              </ul>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                This information may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Name and contact information (email, phone, address)</li>
                <li>Company name and business information</li>
                <li>Facility details and service requirements</li>
                <li>Payment information (processed securely by third-party processors)</li>
                <li>Communications with our team</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Provide, operate, and maintain our services</li>
                <li>Process and complete transactions</li>
                <li>Send you quotes, proposals, and service updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve and optimize our website and services</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
                <li>Detect and prevent fraud or abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to collect information about your
                browsing activities. Cookies help us:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our website</li>
                <li>Improve website performance and user experience</li>
                <li>Provide relevant advertising</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You can control cookies through your browser settings. Note that disabling cookies
                may affect website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who help us operate our
                  business (payment processors, email services, analytics providers)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, court order, or
                  government regulation
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, sale, or
                  acquisition of our business
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you explicitly agree to share your
                  information
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Data Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect
                your personal information. However, no method of transmission over the Internet or
                electronic storage is 100% secure. While we strive to protect your information, we
                cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Your Privacy Rights
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal
                information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Access:</strong> Request a copy of the personal information we hold about
                  you
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate or incomplete
                  information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal information
                </li>
                <li>
                  <strong>Opt-Out:</strong> Unsubscribe from marketing communications
                </li>
                <li>
                  <strong>Data Portability:</strong> Request a copy of your data in a portable
                  format
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                To exercise these rights, please contact us at{' '}
                <a
                  href="mailto:privacy@andersoncleaning.com"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  privacy@andersoncleaning.com
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Children's Privacy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our services are not directed to children under 13 years of age. We do not knowingly
                collect personal information from children under 13. If we learn we have collected
                such information, we will delete it immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the "Last
                Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                If you have questions or concerns about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Anderson Cleaning</strong>
                  <br />
                  103 Wayside Avenue
                  <br />
                  West Springfield, MA 01089
                  <br />
                  <br />
                  Email:{' '}
                  <a
                    href="mailto:privacy@andersoncleaning.com"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    privacy@andersoncleaning.com
                  </a>
                  <br />
                  Phone:{' '}
                  <a
                    href="tel:+15551234567"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
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
