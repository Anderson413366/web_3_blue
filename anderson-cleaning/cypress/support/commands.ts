/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to check accessibility with axe-core
 * Usage: cy.checkA11y()
 */
Cypress.Commands.add('checkA11y', () => {
  cy.injectAxe()
  cy.checkA11y(null, {
    rules: {
      'color-contrast': { enabled: true },
      'link-name': { enabled: true },
      'button-name': { enabled: true },
      'image-alt': { enabled: true },
    },
  })
})

/**
 * Custom command to test keyboard navigation
 * Usage: cy.testKeyboardNav()
 */
Cypress.Commands.add('testKeyboardNav', () => {
  cy.get('body').tab()
  cy.focused().should('be.visible')
})

/**
 * Custom command to toggle dark mode
 * Usage: cy.toggleDarkMode()
 */
Cypress.Commands.add('toggleDarkMode', () => {
  cy.get('[aria-label*="theme"]').click()
})

/**
 * Custom command to check for broken links
 * Usage: cy.checkBrokenLinks()
 */
Cypress.Commands.add('checkBrokenLinks', () => {
  cy.get('a[href]').each(($link) => {
    const href = $link.attr('href')
    if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
      if (href.startsWith('http')) {
        // External link - just check it exists
        cy.request({ url: href, failOnStatusCode: false }).its('status').should('be.lessThan', 400)
      } else {
        // Internal link
        cy.request(href).its('status').should('eq', 200)
      }
    }
  })
})

declare global {
  namespace Cypress {
    interface Chainable {
      checkA11y(): Chainable<void>
      testKeyboardNav(): Chainable<void>
      toggleDarkMode(): Chainable<void>
      checkBrokenLinks(): Chainable<void>
    }
  }
}

export {}
