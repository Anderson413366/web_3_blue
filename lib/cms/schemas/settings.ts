import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'The name of your website',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
        },
        {
          name: 'hours',
          title: 'Business Hours',
          type: 'text',
          rows: 3,
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'googleRating',
      title: 'Google Rating',
      type: 'number',
      description: 'Your Google My Business rating (1-5)',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 4.8,
    }),
    defineField({
      name: 'notices',
      title: 'Site Notices',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Banner notices to display on the site',
    }),
  ],
})
