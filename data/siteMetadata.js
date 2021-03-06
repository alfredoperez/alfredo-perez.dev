// console.log(
//   `ga: ${process.env.GOOGLE_ANALYTICS_ID}
//   repo:${process.env.NEXT_PUBLIC_GISCUS_REPO},
//   repositoryId: ${process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID},
//   category: ${process.env.NEXT_PUBLIC_GISCUS_CATEGORY},
//   categoryId: ${process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID},`
// )
const siteMetadata = {
  title: 'Digital Garden',
  author: 'Alfredo Perez',
  headerTitle: 'Alfredo Perez',
  description: 'A website that I use as a digital garden where ideas can flourish',
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://alfredo-perez.dev',
  siteRepo: 'https://github.com/alfredoperez/alfredo-perez.dev',
  email: 'hello@alfredo-perez.dev',
  github: 'https://github.com/alfredoperez',
  twitter: 'https://twitter.com/alfrodo_perez',
  linkedin: 'https://www.linkedin.com/in/alfredo-perez',
  locale: 'en-US',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/twitter-card.png',
  analytics: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || 'UA-76775958-2',
  },
  ///
  notesPath: 'data/obsidian-vault/Notes',
  highlightsPath: 'data/obsidian-vault/01 - Highlights',
  authorsPath: 'data/authors',
  notesUrl: 'notes',
  comment: {
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO || 'alfredoperez/alfredo-perez.dev',
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID || 'R_kgDOHSWQPQ',
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'General',
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || 'DIC_kwDOHSWQPc4CPGqZ',
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      inputPosition: 'top',
      lang: 'en',
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
    },
  },
}

module.exports = siteMetadata
