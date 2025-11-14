/**
 * GROQ Queries for Sanity CMS
 *
 * All data fetching queries for the Anderson Cleaning website
 */

import { groq } from 'next-sanity'
import { client, getClient } from './sanity.client'

// ===== SETTINGS =====

export async function getSettings(preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "settings"][0]{
      siteName,
      companyInfo,
      socialLinks,
      googleRating,
      notices
    }`
  )
}

// ===== NAVIGATION =====

export async function getNavigation(preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "navigation"][0]{
      headerLinks,
      footerLinks,
      ctaButton
    }`
  )
}

// ===== SERVICES =====

export async function getAllServices(preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "service"] | order(title asc){
      _id,
      title,
      "slug": slug.current,
      summary,
      contractedOnly,
      includes,
      seoTitle,
      seoDescription
    }`
  )
}

export async function getServiceBySlug(slug: string, preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "service" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      summary,
      contractedOnly,
      includes,
      process,
      body,
      "ogImage": ogImage.asset->url,
      seoTitle,
      seoDescription
    }`,
    { slug }
  )
}

export async function getServiceSlugs() {
  return client.fetch(groq`*[_type == "service"]{"slug": slug.current}`)
}

// ===== INDUSTRIES =====

export async function getAllIndustries(preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "industry"] | order(title asc){
      _id,
      title,
      "slug": slug.current,
      "icon": icon.asset->url,
      description,
      pains,
      compliance
    }`
  )
}

export async function getIndustryBySlug(slug: string, preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "industry" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      "icon": icon.asset->url,
      description,
      pains,
      compliance,
      "relatedServices": relatedServices[]->{
        _id,
        title,
        "slug": slug.current,
        summary
      },
      body,
      "ogImage": ogImage.asset->url,
      seoTitle,
      seoDescription
    }`,
    { slug }
  )
}

export async function getIndustrySlugs() {
  return client.fetch(groq`*[_type == "industry"]{"slug": slug.current}`)
}

// ===== TESTIMONIALS =====

export async function getAllTestimonials(preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "testimonial"] | order(publishedAt desc){
      _id,
      quote,
      authorName,
      authorTitle,
      company,
      "logo": logo.asset->url,
      rating,
      featured,
      "industry": industry->{title, "slug": slug.current},
      "service": service->{title, "slug": slug.current},
      publishedAt
    }`
  )
}

export async function getFeaturedTestimonials(limit = 6, preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "testimonial" && featured == true] | order(publishedAt desc)[0...${limit}]{
      _id,
      quote,
      authorName,
      authorTitle,
      company,
      "logo": logo.asset->url,
      rating,
      "industry": industry->{title},
      "service": service->{title}
    }`
  )
}

export async function getTestimonialsByIndustry(industrySlug: string, preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "testimonial" && industry->slug.current == $industrySlug] | order(publishedAt desc){
      _id,
      quote,
      authorName,
      authorTitle,
      company,
      "logo": logo.asset->url,
      rating,
      publishedAt
    }`,
    { industrySlug }
  )
}

// ===== BEFORE & AFTER =====

export async function getAllBeforeAfter(preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "beforeAfter"] | order(publishedAt desc){
      _id,
      title,
      "beforeImage": beforeImage.asset->url,
      "beforeImageAlt": beforeImage.alt,
      "afterImage": afterImage.asset->url,
      "afterImageAlt": afterImage.alt,
      caption,
      "service": service->{title, "slug": slug.current},
      "industry": industry->{title, "slug": slug.current},
      featured,
      publishedAt
    }`
  )
}

export async function getFeaturedBeforeAfter(limit = 4, preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "beforeAfter" && featured == true] | order(publishedAt desc)[0...${limit}]{
      _id,
      title,
      "beforeImage": beforeImage.asset->url,
      "beforeImageAlt": beforeImage.alt,
      "afterImage": afterImage.asset->url,
      "afterImageAlt": afterImage.alt,
      caption
    }`
  )
}

// ===== BADGES =====

export async function getAllBadges(preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "badge" && visible == true] | order(displayOrder asc){
      _id,
      label,
      "icon": icon.asset->url,
      description,
      displayOrder
    }`
  )
}

// ===== PAGES =====

export async function getPageBySlug(slug: string, preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "page" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url,
      body,
      publishedAt
    }`,
    { slug }
  )
}

export async function getPageSlugs() {
  return client.fetch(groq`*[_type == "page"]{"slug": slug.current}`)
}

// ===== BLOG POSTS =====

export async function getAllPosts(preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      excerpt,
      author,
      publishedAt,
      categories,
      tags,
      "featuredImage": featuredImage.asset->url,
      "featuredImageAlt": featuredImage.alt
    }`
  )
}

export async function getPostBySlug(slug: string, preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      author,
      publishedAt,
      categories,
      tags,
      "featuredImage": featuredImage.asset->url,
      "featuredImageAlt": featuredImage.alt,
      "featuredImageCaption": featuredImage.caption,
      body,
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url
    }`,
    { slug }
  )
}

export async function getPostSlugs() {
  return client.fetch(groq`*[_type == "post"]{"slug": slug.current}`)
}

export async function getRecentPosts(limit = 5, preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "post"] | order(publishedAt desc)[0...${limit}]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      author,
      publishedAt,
      "featuredImage": featuredImage.asset->url
    }`
  )
}

export async function getPostsByCategory(category: string, preview = false) {
  return getClient(preview).fetch(
    groq`*[_type == "post" && $category in categories] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      excerpt,
      author,
      publishedAt,
      categories,
      "featuredImage": featuredImage.asset->url
    }`,
    { category }
  )
}

// ===== SEARCH =====

export async function searchContent(searchTerm: string, preview = false) {
  return getClient(preview).fetch(
    groq`*[
      _type in ["service", "industry", "post", "page"] &&
      (
        title match $searchTerm ||
        summary match $searchTerm ||
        excerpt match $searchTerm ||
        description match $searchTerm
      )
    ]{
      _type,
      _id,
      title,
      "slug": slug.current,
      "preview": coalesce(summary, excerpt, description)
    }`,
    { searchTerm: `${searchTerm}*` }
  )
}
