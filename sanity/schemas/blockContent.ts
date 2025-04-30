import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    // Rich text
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code (Inline)', value: 'code'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [{title: 'URL', name: 'href', type: 'url'}],
          },
        ],
      },
    }),

    // Image
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'caption', type: 'string', title: 'Caption'},
        {name: 'alt', type: 'string', title: 'Alternative text'},
      ],
    }),

    // Code block
    defineArrayMember({
      type: 'code',
      title: 'Code Block',
      name: 'codeBlock',
      options: {
        theme: 'github', // or 'monokai'
        withFilename: true,
      },
    }),

    // Callout
    defineArrayMember({
      type: 'object',
      name: 'callout',
      title: 'Callout',
      fields: [
        {name: 'text', type: 'string', title: 'Text'},
        {
          name: 'type',
          type: 'string',
          title: 'Type',
          options: {
            list: [
              {title: 'Info', value: 'info'},
              {title: 'Warning', value: 'warning'},
              {title: 'Error', value: 'error'},
              {title: 'Success', value: 'success'},
            ],
          },
        },
      ],
    }),

    // Video (via URL)
    defineArrayMember({
      type: 'object',
      name: 'videoEmbed',
      title: 'Video Embed',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'Video URL (YouTube, Vimeo, etc.)',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),

    // Video upload (local file)
    defineArrayMember({
      type: 'file',
      name: 'videoFile',
      title: 'Uploaded Video',
      fields: [{name: 'caption', type: 'string', title: 'Caption'}],
      options: {
        accept: 'video/*',
      },
    }),

    // Audio (via URL)
    defineArrayMember({
      type: 'object',
      name: 'audioEmbed',
      title: 'Audio Embed',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'Audio URL (SoundCloud, direct link, etc.)',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),

    // Audio upload (local file)
    defineArrayMember({
      type: 'file',
      name: 'audioFile',
      title: 'Uploaded Audio',
      fields: [{name: 'caption', type: 'string', title: 'Caption'}],
      options: {
        accept: 'audio/*',
      },
    }),
  ],
})
