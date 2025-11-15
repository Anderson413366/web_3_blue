// Service Worker for Anderson Cleaning
// Provides basic offline support without over-caching dynamic content

const CACHE_NAME = 'anderson-cleaning-v1'
const STATIC_CACHE = 'anderson-static-v1'

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/offline.html',
  '/favicon.svg',
  '/images/logo-icon.svg',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets')
      return cache.addAll(STATIC_ASSETS)
    })
  )
  
  // Activate immediately
  self.skipWaiting()
})

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  
  // Take control immediately
  self.clients.claim()
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip API routes (don't cache dynamic data)
  if (url.pathname.startsWith('/api/')) {
    return
  }
  
  // Skip external requests
  if (url.origin !== self.location.origin) {
    return
  }
  
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache successful responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }
        
        // Cache static assets from .next/static and public/
        if (
          url.pathname.startsWith('/_next/static/') ||
          url.pathname.startsWith('/images/') ||
          url.pathname.startsWith('/fonts/') ||
          url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2)$/)
        ) {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache)
          })
        }
        
        return response
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }
          
          // No cache, return offline page for HTML requests
          if (request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html')
          }
        })
      })
  )
})

console.log('[SW] Service worker loaded')
