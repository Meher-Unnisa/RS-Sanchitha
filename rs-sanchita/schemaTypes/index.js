export const schemaTypes = [
  {
    name: 'project',
    title: 'Post',
    type: 'document',
    fields: [
      { name: 'title', title: 'Post Title', type: 'string' },
      { 
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
      },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'image', title: 'Upload Image', type: 'image', options: { hotspot: true } },
      { name: 'likes', title: 'Likes (Auto)', type: 'number', initialValue: 0 },
      { name: 'shares', title: 'Shares (Auto)', type: 'number', initialValue: 0 },
      { 
        name: 'comments', 
        title: 'Comments (Auto)', 
        type: 'array', 
        of: [{type: 'object', fields: [{name: 'name', type: 'string'}, {name: 'text', type: 'string'}]}] 
      },
    ]
  }
]