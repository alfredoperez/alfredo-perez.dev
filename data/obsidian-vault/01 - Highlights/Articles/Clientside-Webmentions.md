---
title: Clientside Webmentions
source: pocket
image_url: https://readwise-assets.s3.amazonaws.com/static/images/article0.00998d930354.png
status: evergreen
tags: 
- digital-garden 
type: articles
created: 5/14/22
updated: 1/26/22
---

Author: Terms of Service and Privacy Policy
URL: https://www.swyx.io/clientside-webmentions

## Highlights
- I searched Webmention implementations on GitHub and found Max Stoiber's impl. It fetches a simple count of webmentions, and then paginated full text responses. I figured I should try adapting that. ⚠️ For this post I will assume you've already followed Max's advice on setting up webmention.io (add the twitter link with rel="me") and then setting up the backfeed with Bridgy. I don't know any other services that perform these functions - we have to be thankful to folks like Aaron Parecki for the fact that these even work.
- Simple Count This is the endpoint to hit: https://webmention.io/api/count.json?target=URL_TO_YOUR_POST/. ⚠️ NOTE: You will need that trailing slash for this request to work
- Paginated Mentions Of course, counts are nice, but real human contact lives in mentions. Here is the endpoint to hit: https://webmention.io/api/mentions?page=0&per-page=20&sort-by=published&target=URL_TO_YOUR_POST/ ⚠️ NOTE: You will need that trailing slash for this request to work! I probably wasted 2 hours figuring this out. ⚠️ Note that the endpoint is /mentions - the docs say to hit /mentions.jf2 but that did not work at all in my testing.
---
title: Clientside Webmentions
source: pocket
image_url: https://readwise-assets.s3.amazonaws.com/static/images/article0.00998d930354.png
status: evergreen
tags: 
- digital-garden 
type: articles
created: 6/27/22
updated: 1/26/22
---

Author: Terms of Service and Privacy Policy
URL: https://www.swyx.io/clientside-webmentions

## Highlights
- I searched Webmention implementations on GitHub and found Max Stoiber's impl. It fetches a simple count of webmentions, and then paginated full text responses. I figured I should try adapting that. ⚠️ For this post I will assume you've already followed Max's advice on setting up webmention.io (add the twitter link with rel="me") and then setting up the backfeed with Bridgy. I don't know any other services that perform these functions - we have to be thankful to folks like Aaron Parecki for the fact that these even work.
- Simple Count This is the endpoint to hit: https://webmention.io/api/count.json?target=URL_TO_YOUR_POST/. ⚠️ NOTE: You will need that trailing slash for this request to work
- Paginated Mentions Of course, counts are nice, but real human contact lives in mentions. Here is the endpoint to hit: https://webmention.io/api/mentions?page=0&per-page=20&sort-by=published&target=URL_TO_YOUR_POST/ ⚠️ NOTE: You will need that trailing slash for this request to work! I probably wasted 2 hours figuring this out. ⚠️ Note that the endpoint is /mentions - the docs say to hit /mentions.jf2 but that did not work at all in my testing.
