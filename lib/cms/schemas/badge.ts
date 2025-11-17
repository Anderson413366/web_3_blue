import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'badge',
  title: 'Badges & Certifications',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Badge Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Badge Icon',
      type: 'image',
      description: 'Icon or logo for this badge',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'What does this badge represent?',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required().integer(),
      initialValue: 100,
    }),
    defineField({
      name: 'visible',
      title: 'Visible',
      type: 'boolean',
      description: 'Show this badge on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'description',
      media: 'icon',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
})
