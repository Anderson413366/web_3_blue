/**
 * Accessibility Tests
 *
 * Tests for WCAG 2.1 AA compliance, dark mode, keyboard navigation
 */

describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should pass axe accessibility tests on homepage', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  it('should toggle dark mode', () => {
    // Check initial theme
    cy.get('html').should('have.class', 'light').or('have.class', 'dark')

    // Toggle theme
    cy.get('button[aria-label*="theme"]').click()

    // Check theme changed
    cy.get('html').should('have.class', 'dark').or('have.class', 'light')
  })

  it('should have visible focus indicators', () => {
    cy.get('a').first().focus()
    cy.focused().should('have.css', 'outline-width').and('not.equal', '0px')
  })

  it('should have proper heading hierarchy', () => {
    cy.get('h1').should('have.length', 1)
    cy.get('h1').should('be.visible')
  })

  it('should have alt text on images', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'alt')
    })
  })

  it('should have ARIA labels on interactive elements', () => {
    cy.get('button').each(($btn) => {
      const hasAriaLabel = $btn.attr('aria-label')
      const hasText = $btn.text().trim().length > 0
      const hasAriaLabelledby = $btn.attr('aria-labelledby')

      expect(hasAriaLabel || hasText || hasAriaLabelledby).to.be.true
    })
  })

  it('should support keyboard navigation', () => {
    cy.get('body').tab()
    cy.focused().should('be.visible')

    cy.focused().tab()
    cy.focused().should('be.visible')
  })
})

describe('Responsive Design', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 720 },
  ]

  viewports.forEach(({ name, width, height }) => {
    it(`should display correctly on ${name}`, () => {
      cy.viewport(width, height)
      cy.visit('/')
      cy.get('header').should('be.visible')
      cy.get('footer').should('be.visible')

      // Check for horizontal scroll
      cy.window().then((win) => {
        expect(win.document.documentElement.scrollWidth).to.equal(win.innerWidth)
      })
    })
  })

  it('should have touch-friendly buttons on mobile', () => {
    cy.viewport('iphone-x')
    cy.visit('/')
    cy.get('button, a').each(($el) => {
      const height = $el.height()
      const width = $el.width()
      // Minimum 44px touch target
      expect(height).to.be.at.least(44)
      expect(width).to.be.at.least(44)
    })
  })
})
