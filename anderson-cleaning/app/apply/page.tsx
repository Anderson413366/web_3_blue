import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply for a Position | Anderson Cleaning Careers',
  description: 'Join our team! Anderson Cleaning is hiring full-time salaried cleaners. Apply now in English, Spanish, Portuguese, or Romanian.',
}

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-700 rounded-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Anderson Cleaning</h1>
                <p className="text-xs text-gray-600">Employment Application</p>
              </div>
            </a>
            <a href="/" className="text-primary-700 hover:text-primary-800 font-medium">
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            Join Our Team at Anderson Cleaning
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-blue-100">
            Discover exciting career opportunities and grow with a company that values dedication and excellence.
          </p>
          <div className="inline-block px-6 py-3 bg-yellow-400 text-blue-800 font-semibold rounded-lg shadow-lg">
            Full-Time Salaried Positions Available
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Anderson Cleaning?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '📈',
                title: 'Growth Opportunities',
                description: 'We invest in your professional development with ongoing training and advancement paths.',
              },
              {
                icon: '👥',
                title: 'Supportive Culture',
                description: 'Join a collaborative, respectful team environment where your contributions matter.',
              },
              {
                icon: '🤝',
                title: 'Impactful Work',
                description: 'Make a tangible difference in creating clean, healthy workplaces for our clients.',
              },
              {
                icon: '🛡️',
                title: 'Competitive Benefits',
                description: 'Full-time salaried positions with comprehensive benefits packages.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Employment Application
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Fill out the form below to apply for a position with Anderson Cleaning.
              We review all applications carefully.
            </p>

            {/* Multilingual Notice */}
            <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
              <p className="text-blue-900">
                <strong>Languages:</strong> This application is available in English, Spanish (Español),
                Portuguese (Português), and Romanian (Română). Full multilingual support coming soon!
              </p>
            </div>

            <form className="space-y-6">
              {/* Personal Information */}
              <div className="border-b pb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Language
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option>English</option>
                      <option>Español</option>
                      <option>Português</option>
                      <option>Română</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Work Eligibility */}
              <div className="border-b pb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Work Eligibility</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Are you eligible to work in the United States? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input type="radio" name="eligible" value="yes" className="mr-2" required />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="eligible" value="no" className="mr-2" />
                        No
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you have a valid driver's license? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input type="radio" name="license" value="yes" className="mr-2" required />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="license" value="no" className="mr-2" />
                        No
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you have reliable transportation? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input type="radio" name="transport" value="yes" className="mr-2" required />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="transport" value="no" className="mr-2" />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="border-b pb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Availability</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What days and times are you available? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Monday-Friday 9am-5pm, Weekends available"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Experience */}
              <div className="border-b pb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Experience</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Previous cleaning or related experience
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Describe your relevant work experience..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certifications or special skills
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="List any relevant certifications, training, or skills..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="border-b pb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Resume</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload your resume (PDF or DOC)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Consent */}
              <div className="pt-4">
                <label className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-3" required />
                  <span className="text-sm text-gray-700">
                    I agree to the Privacy Policy and authorize Anderson Cleaning to contact me regarding this application. <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-accent-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-accent-600 transform hover:scale-105 transition-all duration-300"
                >
                  Submit Application
                </button>
              </div>

              <p className="text-center text-sm text-gray-600 mt-4">
                We review all applications carefully. Our HR team will contact you soon!
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">Questions about this position?</p>
          <p className="text-accent-400 font-semibold">Contact: hr@andersoncleaning.com | (555) 123-4567</p>
          <p className="mt-6 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Anderson Cleaning, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
