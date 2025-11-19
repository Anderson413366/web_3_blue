import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const navigation = {
  services: [
    { name: 'Office Cleaning', href: '/services/office-cleaning' },
    { name: 'Janitorial Services', href: '/services' },
    { name: 'Floor Care', href: '/services' },
    { name: 'Window Cleaning', href: '/services' },
  ],
  industries: [
    { name: 'Healthcare', href: '/industries/healthcare' },
    { name: 'Corporate Offices', href: '/industries/corporate-offices' },
    { name: 'Educational Facilities', href: '/industries/educational-facilities' },
    { name: 'Manufacturing', href: '/industries/manufacturing-warehouses' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Testimonials', href: '/testimonials' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-4 xl:gap-12">
          {/* Company Info */}
          <div className="space-y-8 xl:col-span-1">
            <div>
              <h3 className="text-2xl font-bold text-white">Anderson Cleaning</h3>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                Professional commercial cleaning services for businesses in Western Massachusetts and Northern Connecticut.
              </p>
            </div>
            <div className="space-y-4">
              <a
                href="tel:4133065053"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                (413) 306-5053
              </a>
              <a
                href="mailto:info@andersoncleaning.com"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@andersoncleaning.com
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>103 Wayside Avenue<br />West Springfield, MA 01089</span>
              </div>
            </div>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Industries</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.industries.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400 text-center">
            &copy; {currentYear} Anderson Cleaning, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
