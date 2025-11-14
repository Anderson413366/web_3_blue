import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'beforeAfter',
  title: 'Before & After Examples',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
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
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image',
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
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      description: 'Brief description of the transformation',
    }),
    defineField({
      name: 'service',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Which service does this example showcase?',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'reference',
      to: [{ type: 'industry' }],
      description: 'Which industry is this example from?',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display prominently on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'caption',
      media: 'afterImage',
    },
  },
})
