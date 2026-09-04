import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Post Title', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Select Menu Category - Where to show this post?',
      type: 'string',
      options: {
        list: [
          'Home',
          'News',
          'Info-In-Graphics',
          'NaMo Exclusive',
          'My Network',
          'Volunteer',
          'Govt in action',
          'Peoples Corner',
          'Photo Booth',
          'Contact Us',
          'Pariksha Pe Charcha',
          'Kashi Vikas Yatra',
          'FAQ',
          'Trending',
          'Photo Gallery',
          'Mann Ki Baat',
          'NaMo Merchandise',
        ],
        layout: 'dropdown'
      }
    }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Upload Image', type: 'image', options: {hotspot: true} }),
    defineField({ name: 'likes', title: 'Likes (Auto)', type: 'number', initialValue: 0 }),
    defineField({ name: 'shares', title: 'Shares (Auto)', type: 'number', initialValue: 0 }),
    defineField({ name: 'comments', title: 'Comments (Auto)', type: 'array', of: [{type: 'object', fields: [{name: 'name', type: 'string'}, {name: 'text', type: 'string'}]}] }),
  ],
})