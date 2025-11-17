/**
 * Email Templates
 *
 * Clean, accessible HTML email templates for form submissions
 */

import type { QuoteFormData, ContactFormData } from '@/lib/validation/quote'
import {
  facilityTypeLabels,
  cleaningFrequencyLabels,
  serviceLabels,
  formatPhoneNumber,
} from '@/lib/validation/quote'
import { escapeHtml } from './sanitize'

/**
 * Base email template with Anderson Cleaning branding
 */
function getBaseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Anderson Cleaning</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f3f4f6;
      color: #1f2937;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
      color: #ffffff;
      padding: 32px 24px;
      text-align: center;
    }
    .logo {
      font-size: 28px;
      font-weight: 700;
      margin: 0;
    }
    .content {
      padding: 32px 24px;
    }
    .section {
      margin-bottom: 24px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #1e40af;
      margin: 0 0 12px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #e5e7eb;
    }
    .field {
      margin-bottom: 12px;
    }
    .field-label {
      font-weight: 600;
      color: #4b5563;
      margin-right: 8px;
    }
    .field-value {
      color: #1f2937;
    }
    .footer {
      background-color: #f9fafb;
      padding: 24px;
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
    }
    .footer a {
      color: #1e40af;
      text-decoration: none;
    }
    @media (max-width: 600px) {
      .content {
        padding: 24px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">Anderson Cleaning</h1>
      <p style="margin: 8px 0 0 0; opacity: 0.9;">Professional Commercial Cleaning Services</p>
    </div>
    ${content}
    <div class="footer">
      <p style="margin: 0 0 8px 0;">
        <strong>Anderson Cleaning, Inc.</strong><br>
        103 Wayside Avenue, West Springfield, MA 01089<br>
        Phone: <a href="tel:+14133065053">(413) 306-5053</a><br>
        Email: <a href="mailto:info@andersoncleaning.com">info@andersoncleaning.com</a>
      </p>
      <p style="margin: 16px 0 0 0; font-size: 12px; color: #9ca3af;">
        This is an automated notification from your website contact form.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Quote Request Email Template
 */
export function generateQuoteEmail(data: QuoteFormData): { html: string; text: string } {
  const content = `
    <div class="content">
      <p style="font-size: 16px; margin: 0 0 24px 0;">
        You have received a new <strong>quote request</strong> from your website.
      </p>

      <div class="section">
        <h2 class="section-title">Contact Information</h2>
        <div class="field">
          <span class="field-label">Name:</span>
          <span class="field-value">${escapeHtml(data.fullName)}</span>
        </div>
        <div class="field">
          <span class="field-label">Company:</span>
          <span class="field-value">${escapeHtml(data.company)}</span>
        </div>
        <div class="field">
          <span class="field-label">Email:</span>
          <span class="field-value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></span>
        </div>
        <div class="field">
          <span class="field-label">Phone:</span>
          <span class="field-value"><a href="tel:${data.phone}">${formatPhoneNumber(data.phone)}</a></span>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Facility Information</h2>
        <div class="field">
          <span class="field-label">Address:</span>
          <span class="field-value">${escapeHtml(data.address)}, ${escapeHtml(data.city)}, ${escapeHtml(data.zipCode)}</span>
        </div>
        <div class="field">
          <span class="field-label">Facility Type:</span>
          <span class="field-value">${facilityTypeLabels[data.facilityType] || data.facilityType}</span>
        </div>
        <div class="field">
          <span class="field-label">Cleaning Frequency:</span>
          <span class="field-value">${cleaningFrequencyLabels[data.cleaningFrequency] || data.cleaningFrequency}</span>
        </div>
        ${
          data.squareFootage
            ? `<div class="field">
          <span class="field-label">Square Footage:</span>
          <span class="field-value">${data.squareFootage.toLocaleString()} sq ft</span>
        </div>`
            : ''
        }
        ${
          data.desiredStartDate
            ? `<div class="field">
          <span class="field-label">Desired Start Date:</span>
          <span class="field-value">${new Date(data.desiredStartDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>`
            : ''
        }
      </div>

      <div class="section">
        <h2 class="section-title">Services Requested</h2>
        <ul style="margin: 0; padding-left: 20px;">
          ${data.services.map((service) => `<li>${serviceLabels[service] || service}</li>`).join('')}
        </ul>
      </div>

      ${
        data.specialRequests
          ? `<div class="section">
        <h2 class="section-title">Special Requests</h2>
        <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.specialRequests)}</p>
      </div>`
          : ''
      }

      <div style="margin-top: 32px; padding: 16px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
        <p style="margin: 0; color: #92400e;">
          <strong>⚡ Action Required:</strong> Respond within 30 minutes to maintain your service promise!
        </p>
      </div>
    </div>
  `

  const text = `
NEW QUOTE REQUEST - Anderson Cleaning

Contact Information:
- Name: ${data.fullName}
- Company: ${data.company}
- Email: ${data.email}
- Phone: ${formatPhoneNumber(data.phone)}

Facility Information:
- Address: ${data.address}, ${data.city}, ${data.zipCode}
- Facility Type: ${facilityTypeLabels[data.facilityType] || data.facilityType}
- Cleaning Frequency: ${cleaningFrequencyLabels[data.cleaningFrequency] || data.cleaningFrequency}
${data.squareFootage ? `- Square Footage: ${data.squareFootage.toLocaleString()} sq ft` : ''}
${data.desiredStartDate ? `- Desired Start Date: ${new Date(data.desiredStartDate).toLocaleDateString()}` : ''}

Services Requested:
${data.services.map((service) => `- ${serviceLabels[service] || service}`).join('\n')}

${data.specialRequests ? `Special Requests:\n${data.specialRequests}` : ''}

---
Respond within 30 minutes to maintain your service promise!
  `.trim()

  return {
    html: getBaseTemplate(content),
    text,
  }
}

/**
 * Contact Form Email Template
 */
export function generateContactEmail(data: ContactFormData): { html: string; text: string } {
  const content = `
    <div class="content">
      <p style="font-size: 16px; margin: 0 0 24px 0;">
        You have received a new <strong>contact form submission</strong> from your website.
      </p>

      <div class="section">
        <h2 class="section-title">Contact Details</h2>
        <div class="field">
          <span class="field-label">Name:</span>
          <span class="field-value">${escapeHtml(data.name)}</span>
        </div>
        <div class="field">
          <span class="field-label">Email:</span>
          <span class="field-value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></span>
        </div>
        <div class="field">
          <span class="field-label">Phone:</span>
          <span class="field-value"><a href="tel:${data.phone}">${formatPhoneNumber(data.phone)}</a></span>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Message</h2>
        <p style="margin: 0; white-space: pre-wrap; background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
${escapeHtml(data.message)}
        </p>
      </div>

      <div style="margin-top: 32px; padding: 16px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
        <p style="margin: 0; color: #92400e;">
          <strong>⚡ Action Required:</strong> Respond within 1 business day!
        </p>
      </div>
    </div>
  `

  const text = `
NEW CONTACT FORM SUBMISSION - Anderson Cleaning

Contact Details:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${formatPhoneNumber(data.phone)}

Message:
${data.message}

---
Respond within 1 business day!
  `.trim()

  return {
    html: getBaseTemplate(content),
    text,
  }
}

/**
 * Careers Application Email Template
 */
export function generateCareersEmail(data: any): { html: string; text: string } {
  const content = `
    <div class="content">
      <p style="font-size: 16px; margin: 0 0 24px 0;">
        You have received a new <strong>job application</strong> from your website.
      </p>

      <div class="section">
        <h2 class="section-title">Applicant Information</h2>
        <div class="field">
          <span class="field-label">Name:</span>
          <span class="field-value">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</span>
        </div>
        <div class="field">
          <span class="field-label">Email:</span>
          <span class="field-value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></span>
        </div>
        <div class="field">
          <span class="field-label">Phone:</span>
          <span class="field-value"><a href="tel:${data.phone}">${escapeHtml(data.phone)}</a></span>
        </div>
        <div class="field">
          <span class="field-label">Position:</span>
          <span class="field-value">${escapeHtml(data.applyingFor || 'Not specified')}</span>
        </div>
      </div>

      ${
        data.message
          ? `<div class="section">
        <h2 class="section-title">Cover Letter / Message</h2>
        <p style="margin: 0; white-space: pre-wrap; background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
${escapeHtml(data.message)}
        </p>
      </div>`
          : ''
      }

      <div style="margin-top: 24px; padding: 16px; background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
        <p style="margin: 0; color: #1e40af;">
          <strong>📎 Resume:</strong> ${data.hasResume ? 'Attached to this email' : 'Not provided'}
        </p>
      </div>
    </div>
  `

  const text = `
NEW JOB APPLICATION - Anderson Cleaning

Applicant Information:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Phone: ${data.phone}
- Position: ${data.applyingFor || 'Not specified'}

${data.message ? `Cover Letter / Message:\n${data.message}` : ''}

Resume: ${data.hasResume ? 'Attached' : 'Not provided'}
  `.trim()

  return {
    html: getBaseTemplate(content),
    text,
  }
}

/**
 * Newsletter Subscription Email Template
 */
export function generateNewsletterEmail(email: string): { html: string; text: string } {
  const content = `
    <div class="content">
      <p style="font-size: 16px; margin: 0 0 24px 0;">
        Someone has subscribed to your <strong>newsletter</strong>!
      </p>

      <div class="section">
        <h2 class="section-title">Subscriber Details</h2>
        <div class="field">
          <span class="field-label">Email:</span>
          <span class="field-value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></span>
        </div>
        <div class="field">
          <span class="field-label">Subscribed At:</span>
          <span class="field-value">${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</span>
        </div>
      </div>

      <div style="margin-top: 24px; padding: 16px; background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
        <p style="margin: 0; color: #1e40af;">
          <strong>Next Steps:</strong> Add this email to your newsletter list in your email marketing platform.
        </p>
      </div>
    </div>
  `

  const text = `
NEW NEWSLETTER SUBSCRIPTION - Anderson Cleaning

Email: ${email}
Subscribed At: ${new Date().toLocaleString()}

Next Steps: Add this email to your newsletter list.
  `.trim()

  return {
    html: getBaseTemplate(content),
    text,
  }
}
