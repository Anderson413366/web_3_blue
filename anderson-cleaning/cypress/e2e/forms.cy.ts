/**
 * Forms Tests
 *
 * Tests for contact form, quote form, and form validation
 */

describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/contact')
  })

  it('should display contact form', () => {
    cy.get('form').should('be.visible')
    cy.get('input[name="name"]').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="phone"]').should('exist')
    cy.get('textarea[name="message"]').should('exist')
  })

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click()
    cy.contains(/required|must/i).should('be.visible')
  })

  it('should validate email format', () => {
    cy.get('input[name="email"]').type('invalid-email')
    cy.get('input[name="email"]').blur()
    cy.contains(/valid email/i).should('be.visible')
  })

  it('should submit contact form successfully', () => {
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="phone"]').type('413-306-5053')
    cy.get('textarea[name="message"]').type('This is a test message from Cypress')

    // Intercept API call
    cy.intercept('POST', '/api/contact', {
      statusCode: 200,
      body: { success: true, message: 'Thank you for contacting us!' },
    }).as('contactSubmit')

    cy.get('button[type="submit"]').click()
    cy.wait('@contactSubmit')
    cy.contains(/success|thank you/i).should('be.visible')
  })

  it('should have proper accessibility labels', () => {
    cy.get('input[name="name"]').should('have.attr', 'id')
    cy.get('label[for]').should('exist')
    cy.get('input[type="tel"]').should('have.attr', 'autocomplete', 'tel')
  })
})

describe('Quote Form', () => {
  beforeEach(() => {
    cy.visit('/quote')
  })

  it('should display multi-step quote form', () => {
    cy.contains(/step/i).should('be.visible')
    cy.get('input[name="fullName"]').should('exist')
  })

  it('should navigate through form steps', () => {
    // Step 1
    cy.get('input[name="fullName"]').type('Test User')
    cy.get('input[name="company"]').type('Test Company')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="phone"]').type('413-306-5053')
    cy.contains('button', /next/i).click()

    // Step 2
    cy.contains(/step 2/i).should('be.visible')
    cy.get('input[name="address"]').should('be.visible')
  })

  it('should prevent progression with invalid data', () => {
    cy.contains('button', /next/i).click()
    cy.contains(/required/i).should('be.visible')
  })
})
