import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Brief overview shown in listings',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'contractedOnly',
      title: 'Contracted Clients Only',
      type: 'boolean',
      description: 'Is this service only available to contracted clients?',
      initialValue: false,
    }),
    defineField({
      name: 'includes',
      title: "What's Included",
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of items/services included',
    }),
    defineField({
      name: 'process',
      title: 'Service Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'step',
              title: 'Step Number',
              type: 'number',
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 3,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Detailed Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override the default page title for SEO',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Meta description for search engines',
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
    },
  },
})
