/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://andersoncleaning.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Set to true if you expect > 50k URLs
  exclude: ['/studio', '/studio/*', '/api/*', '/apply/success', '/_next/*', '/404', '/500'],

  // Priority rules for different page types
  transform: async (config, path) => {
    // Custom priority based on page type
    let priority = 0.7 // Default
    let changefreq = 'weekly'

    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.startsWith('/services')) {
      priority = 0.9
      changefreq = 'weekly'
    } else if (path === '/quote') {
      priority = 0.9
      changefreq = 'weekly'
    } else if (path.startsWith('/industries')) {
      priority = 0.8
      changefreq = 'weekly'
    } else if (path === '/about' || path === '/contact') {
      priority = 0.8
      changefreq = 'monthly'
    } else if (path.startsWith('/blog')) {
      priority = 0.7
      changefreq = 'weekly'
    } else if (path === '/testimonials') {
      priority = 0.7
      changefreq = 'monthly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },

  // Additional paths to include (if not auto-discovered)
  additionalPaths: async (config) => {
    const paths = []

    // Add language-specific career pages
    const languages = ['en', 'es', 'pt-BR', 'ro']
    languages.forEach((lang) => {
      paths.push({
        loc: `/apply?lang=${lang}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    })

    return paths
  },

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/studio/*', '/api/*', '/_next/*', '/apply/success'],
      },
      // Special rules for specific bots (if needed)
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/studio', '/api/*'],
      },
    ],
    additionalSitemaps: [
      // Add blog sitemap if you have one
      // `${process.env.NEXT_PUBLIC_SITE_URL}/blog-sitemap.xml`,
    ],
  },
}
