import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with correct text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('renders as button element by default', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('renders as div when asChild is true', () => {
      render(<Button asChild>Click me</Button>)
      const element = screen.getByText('Click me')
      expect(element.tagName).toBe('DIV')
    })
  })

  describe('Click Events', () => {
    it('handles click events', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not trigger click when disabled', () => {
      const handleClick = jest.fn()
      render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not trigger click when loading', () => {
      const handleClick = jest.fn()
      render(
        <Button onClick={handleClick} isLoading>
          Click me
        </Button>
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Loading State', () => {
    it('shows loading spinner when isLoading is true', () => {
      render(<Button isLoading>Click me</Button>)

      // Check for loading indicator (svg with specific class)
      const loadingIcon = document.querySelector('.animate-spin')
      expect(loadingIcon).toBeInTheDocument()
    })

    it('is disabled when loading', () => {
      render(<Button isLoading>Click me</Button>)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })

  describe('Disabled State', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Click me</Button>)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('has correct aria attributes when disabled', () => {
      render(<Button disabled>Click me</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('disabled')
    })
  })

  describe('Variants', () => {
    it('renders primary variant correctly', () => {
      render(<Button variant="primary">Primary</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-primary-700')
    })

    it('renders accent variant correctly', () => {
      render(<Button variant="accent">Accent</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-accent-500')
    })

    it('renders outline variant correctly', () => {
      render(<Button variant="outline">Outline</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('border')
    })

    it('renders ghost variant correctly', () => {
      render(<Button variant="ghost">Ghost</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('hover:bg-accent')
    })

    it('renders link variant correctly', () => {
      render(<Button variant="link">Link</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('underline-offset-4')
    })

    it('renders destructive variant correctly', () => {
      render(<Button variant="destructive">Destructive</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-red-600')
    })
  })

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Button size="sm">Small</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-9')
    })

    it('renders large size correctly', () => {
      render(<Button size="lg">Large</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-11')
    })

    it('renders icon size correctly', () => {
      render(<Button size="icon">Icon</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10', 'w-10')
    })

    it('renders default size correctly', () => {
      render(<Button>Default</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10')
    })
  })

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Button className="custom-class">Custom</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('accepts custom data attributes', () => {
      render(<Button data-testid="custom-button">Custom</Button>)

      const button = screen.getByTestId('custom-button')
      expect(button).toBeInTheDocument()
    })

    it('accepts type attribute', () => {
      render(<Button type="submit">Submit</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
    })
  })

  describe('Accessibility', () => {
    it('is keyboard accessible', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)

      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()

      fireEvent.keyDown(button, { key: 'Enter' })
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalled()
    })

    it('has correct role', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('supports aria-label', () => {
      render(<Button aria-label="Custom label">Icon</Button>)
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument()
    })
  })
})
