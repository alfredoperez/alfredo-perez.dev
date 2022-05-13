---
title: Migrating my Digital Garden to NextJS
tags:
  - digital-garden
type: note
status: seed
created: 2/02/22
updated: 2/02/22
---

## Picking a repository

https://github.com/timlrx/tailwind-nextjs-starter-blog


## Initial Customization
- Update `pacakge.json` file
	- Package name, version, license and Author
-  Personalize `siteMetadata.js` (site related information)  
	-  Website metadata
	-  Personal data
		- Email -> Setup an `Email Forwarding` in Google Domains to a custom email e.g. hello@alfredo-perez.dev
```
title: 'Alfredo Perez Digital garden',  
author: 'Alfredo Perez',  
headerTitle: 'Welcome to my digital garden',  
description: 'A website that I use as a digital garden where ideas can flourish',  
language: 'en-us',  
theme: 'system', // system, dark or light  
siteUrl: 'https://alfredo-perez.dev',  
siteRepo: 'https://github.com/timlrx/tailwind-nextjs-starter-blog',  
email: 'hello@alfredo-perez.dev',  
github: 'https://github.com/alfredoperez',  
twitter: 'https://twitter.com/alfrodo_perez',  
linkedin: 'https://www.linkedin.com/in/alfredo-perez',  
locale: 'en-US',
 ```

- Using Google Analytics and create an environment variable for it
```
analytics: {
   googleAnalyticsId: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
}
```

- Static
	- Add logo
	- Icons- > Favicons,  apple touch icon, 
	- Update web manifest to include android chrome icons
	- Update the `avatar.png`. This is used when showing the author in the blog
	-
- Personalize `authors/default.md` (main author)  
	- Remove the `sparrowhawk.md` and the `sparrowhawk-avatar.jpg`
	- Remove references to `sparrowhawk`
- Blog Posts cleanup
	- Remove `images\canada`, `google.png`, `ocean.jpeg` and `time-machine.jpg`
	
- Modify `projectsData.ts` and `projects.tsx`  
	- Remove the link from  `headerNavLinks.js
	-

-  [ ]  Create your Markdown Reference File and setup the Frontmatter
- Setup newsletter
	- ConvertKit




# TODO:
## Extend / Customize  
  
`data/siteMetadata.js` - contains most of the site related information which should be modified for a user's need.  
  
`data/authors/default.md` - default author information (required). Additional authors can be added as files in `data/authors`.  
  
`data/projectsData.js` - data used to generate styled card on the projects page.  
  
`data/headerNavLinks.js` - navigation links.  
  
`data/logo.svg` - replace with your own logo.  
  
`data/blog` - replace with your own blog posts.  
  
`public/static` - store assets such as images and favicons.  
  
`tailwind.config.js` and `css/tailwind.css` - contain the tailwind stylesheet which can be modified to change the overall look and feel of the site.  
  
`css/prism.css` - controls the styles associated with the code blocks. Feel free to customize it and use your preferred prismjs theme e.g. [prism themes](https://github.com/PrismJS/prism-themes).  
  
`components/social-icons` - to add other icons, simply copy an svg file from [Simple Icons](https://simpleicons.org/) and map them in `index.js`. Other icons use [heroicons](https://heroicons.com/).  
  
`components/MDXComponents.js` - pass your own JSX code or React component by specifying it over here. You can then call them directly in the `.mdx` or `.md` file. By default, a custom link and image component is passed.  
  
`layouts` - main templates used in pages.  
  
`pages` - pages to route to. Read the [Next.js documentation](https://nextjs.org/docs) for more information.  
  
`next.config.js` - configuration related to Next.js. You need to adapt the Content Security Policy if you want to load scripts, images etc. from other domains.  
  
## Post  
  
### Frontmatter  
  
Frontmatter follows [Hugo's standards](https://gohugo.io/content-management/front-matter/).  
  
Currently 7 fields are supported.  
  
```  
title (required)  
date (required)  
tags (required, can be empty array)  
lastmod (optional)  
draft (optional)  
summary (optional)  
images (optional, if none provided defaults to socialBanner in siteMetadata config)  
authors (optional list which should correspond to the file names in `data/authors`. Uses `default` if none is specified)  
layout (optional list which should correspond to the file names in `data/layouts`)  
```  
  
Here's an example of a post's frontmatter:  
  
```  
---  
title: 'Introducing Tailwind Nexjs Starter Blog'  
date: '2021-01-12'  
lastmod: '2021-01-18'  
tags: ['next-js', 'tailwind', 'guide']  
draft: false  
summary: 'Looking for a performant, out of the box template, with all the best in web technology to support your blogging needs? Checkout the Tailwind Nextjs Starter Blog template.'  
images: ['/static/images/canada/mountains.jpg', '/static/images/canada/toronto.jpg']  
layout: PostLayout  
---  
```




1. Modify `headerNavLinks.js` to customize navigation links  
2. Add blog posts  
3. Deploy on Vercel

 ## Initial Cleanup
- [ ]  Remove Mailchimp


##  Adding Features
- [ ] Cypress
- [ ]  StoryBook



