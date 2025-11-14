/**
 * Navigation Tests
 *
 * Tests for header navigation, footer links, and routing
 */

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    cy.contains('Anderson Cleaning').should('be.visible')
    cy.get('header').should('be.visible')
    cy.get('footer').should('be.visible')
  })

  it('should navigate to all main pages from header', () => {
    const pages = [
      { name: 'About', url: '/about' },
      { name: 'Services', url: '/services' },
      { name: 'Industries', url: '/industries' },
      { name: 'Contact', url: '/contact' },
    ]

    pages.forEach(({ name, url }) => {
      cy.visit('/')
      cy.contains('nav a', name).click()
      cy.url().should('include', url)
      cy.get('h1').should('be.visible')
    })
  })

  it('should open mobile menu on small screens', () => {
    cy.viewport('iphone-x')
    cy.get('[aria-label*="menu"]').should('be.visible').click()
    cy.get('[aria-label="Mobile Navigation"]').should('be.visible')
  })

  it('should have working footer links', () => {
    cy.get('footer a[href="/privacy"]').should('exist')
    cy.get('footer a[href="/terms"]').should('exist')
    cy.get('footer a[href="tel:+14133065053"]').should('exist')
    cy.get('footer a[href="mailto:info@andersoncleaning.com"]').should('exist')
  })

  it('should have skip to main content link', () => {
    cy.get('a[href="#main-content"]').should('exist')
    // Test keyboard navigation
    cy.get('body').tab()
    cy.focused().should('have.attr', 'href', '#main-content')
  })
})
