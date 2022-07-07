---
title: My Notes from Gatsby Camp Fall 2021
tags:
  - GatsbyJS
type: conference
status: evergreen
created: 9/16/21
updated: 5/13/22
---

![https://res.cloudinary.com/dagkspppt/image/upload/v1631807469/gatsby_rudgbh.png](https://res.cloudinary.com/dagkspppt/image/upload/v1631807469/gatsby_rudgbh.png)
These are some of my notes related to the Gatsby Camp Fall '21

## What's new and what is coming
[What's new and what is coming](https://www.youtube.com/watch?v=5ob80szzLJM&list=PLCU2qJekvcN04rMcKh-MhddrAfG1Zekub&index=1)
- Gatsby Cloud is 10x faster
- Parallel Query Running
  - Parallel Query Running leverages multiple cores to speed up builds, by as much as 30%
- DSG (Deferred Static Generation)
  - Defers non-critical page generation to user request, speeding up build times.
- SSR
  - Scale to build your vision for the web, without limits.
- Gatsby Beta 4 includes PQR, DSG and SSR 🎉
- Install using `npm i gatsby@next`

## To Gatsby 4 and beyond
[To Gatsby 4 and beyond](https://www.youtube.com/watch?v=6Eglvixg4eg&list=PLCU2qJekvcN04rMcKh-MhddrAfG1Zekub&index=2)
### Before Today:

- In-memory store
- Redux, a plain JavaScript object
- Single CPU for queries
- High Memory Usage
- Requires Persistence

Gatsby 4 ships with "GatsbyDB" a new datastore to leverage Gatsby Cloud to scale static and unlock the future

### GatsbyDB Benefits

- Faster cache persistence
- Reduction in peak memory utilization
- Allows both local and remote machines to utilize all CPU Cores
- Datasets can be larger than available RAM

By storing the Gatsby data-layer in LMDB we can also restore the data  in a worker, container, serverless function..

### SSG/SSR/DSG

#### Static Site Generation (SSG)

- User want their site to be fully built at build time.
- They don't mind the extra time the build process takes to generate these files.
- At the right scale (~ 100k pages), this is the best UX available

![https://res.cloudinary.com/dagkspppt/image/upload/v1631809116/Gatsby%20Camp%20Fall%2021/gatsby-camp-ssg_cpsvog.png](https://res.cloudinary.com/dagkspppt/image/upload/v1631809116/Gatsby%20Camp%20Fall%2021/gatsby-camp-ssg_cpsvog.png)

#### Server Side Rendering (SSR)

- Server rendering generates the full HTML for the page on the server.
- Focused for data fetching outside the Gatsby data-layer
- New export `getServerData` to access 3rd Party Data

![https://res.cloudinary.com/dagkspppt/image/upload/v1631809116/Gatsby%20Camp%20Fall%2021/gatsby-camp-ssr_krnfcx.png](https://res.cloudinary.com/dagkspppt/image/upload/v1631809116/Gatsby%20Camp%20Fall%2021/gatsby-camp-ssr_krnfcx.png)

#### Deferred Static Generation (DSG)

- A user has a very large site and doesn't want to build all pages up front
- For content heavy sites, why build pages at build time for pages with little to no traffic
- We are confident this eliminates the "Jamtax" in a user-friendly way
  ![https://res.cloudinary.com/dagkspppt/image/upload/v1631809116/Gatsby%20Camp%20Fall%2021/gatsby-camp-dsg_xk5m03.png](https://res.cloudinary.com/dagkspppt/image/upload/v1631809116/Gatsby%20Camp%20Fall%2021/gatsby-camp-dsg_xk5m03.png)
-

## What React 18+ Unlocks for Gatsby
[What React 18+ Unlocks for Gatsby](https://www.youtube.com/watch?v=xPM7MhoaZY4&list=PLCU2qJekvcN04rMcKh-MhddrAfG1Zekub&index=3)

### Improved Core Web Vitals

- React's new priority scheduler - improves TBT metrics
- ‹Suspense /> Boundaries allows React to pause rendering

### Introducing Query

- No more page/static queries
- Use Queries everywhere
- Async Rendering allows us yield async tasks

![https://res.cloudinary.com/dagkspppt/image/upload/v1632493207/Gatsby%20Camp%20Fall%2021/gatsby-camp-react18-query_bev3ei.png](https://res.cloudinary.com/dagkspppt/image/upload/v1632493207/Gatsby%20Camp%20Fall%2021/gatsby-camp-react18-query_bev3ei.png)

### Hybrid Routes

- Blending static and dynamic together
- Re-render fragments instead of pages

### Server Components

- Reduce client side code - React render trees
- Move code to the server(what's old is new again)
- Works great with Static Site Generation
- Not part of React 18 but will come in future versions

### How to use this today?

Install `react@next` and `react-dom@next`


## Parallel Query Running with Gatsby 4

[Parallel Query Running with Gatsby 4](https://www.youtube.com/watch?v=X3haR60VjZc&list=PLCU2qJekvcN04rMcKh-MhddrAfG1Zekub&index=5)

In the demo it was shown a comparison of how fast the Parallel Query Running in Gatsby4 and how it is way faster than the old query since it can use all the cores. 14400 seconds vs 800 seconds

Over 50% of people will abandon a site if it takes more than 3 seconds to load.
**This is why Static is still best.** Since all the assets are push to the edge in the CDN.
In order to get this, we use the **jamtax** since everything needs to be build upfront.

The Query Running process was taking 40% of time. Query Running, is the heart of getting the data for the pages. Gatsby team used the telemetry data to track this

![https://res.cloudinary.com/dagkspppt/image/upload/v1631812256/Gatsby%20Camp%20Fall%2021/gatsby-camp-query-running_wccdlv.png](https://res.cloudinary.com/dagkspppt/image/upload/v1631812256/Gatsby%20Camp%20Fall%2021/gatsby-camp-query-running_wccdlv.png)

![https://res.cloudinary.com/dagkspppt/image/upload/v1631812360/Gatsby%20Camp%20Fall%2021/gatsby-camp-query-running-how-it-works_w5z54m.png](https://res.cloudinary.com/dagkspppt/image/upload/v1631812360/Gatsby%20Camp%20Fall%2021/gatsby-camp-query-running-how-it-works_w5z54m.png)

Parallel Query Running was developed to alleviate the time it takes to process and it uses LMDB

![https://res.cloudinary.com/dagkspppt/image/upload/v1631812496/Gatsby%20Camp%20Fall%2021/gatsby-camp-query-running-how-it-works-2_lchisq.png](https://res.cloudinary.com/dagkspppt/image/upload/v1631812496/Gatsby%20Camp%20Fall%2021/gatsby-camp-query-running-how-it-works-2_lchisq.png)

![https://res.cloudinary.com/dagkspppt/image/upload/v1631812580/Gatsby%20Camp%20Fall%2021/gatsby-camp-query-running-how-it-works-3_ywmilv.png](https://res.cloudinary.com/dagkspppt/image/upload/v1631812580/Gatsby%20Camp%20Fall%2021/gatsby-camp-query-running-how-it-works-3_ywmilv.png)

### Gatsby: Static that Scales

- [/] Static Site Generation
- [/] Incremental Build
- [/] Parallel Image Processing
- [/] Parallel Query Running
- [ ] Server Side Rendering (WIP)
- [ ] Deferred Static Generation (WIP)

Here is chart of how much improves with Parallel Querying

![https://res.cloudinary.com/dagkspppt/image/upload/v1631812975/Gatsby%20Camp%20Fall%2021/gatsby-camp-query-improvement_skzqqe.png](https://res.cloudinary.com/dagkspppt/image/upload/v1631812975/Gatsby%20Camp%20Fall%2021/gatsby-camp-query-improvement_skzqqe.png)

### How to use it

This is available at Gatsby 4 and 3. In the `gatby-config.js` add the following flag:

```js
module.exports = {
  flags: {
	    PARALLEL_QUERY_RUNNING: true
	}
}
```

## Native React 18 Code-Splitting with Gatsby

[Native React 18 Code-Splitting with Gatsby](https://www.youtube.com/watch?v=lypEGNEIRKE&list=PLCU2qJekvcN04rMcKh-MhddrAfG1Zekub&index=6)

Use of `React.Lazy` and [Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html) to improve performance from React 18.


## Scale Your Website With Flexible Content Models

[Scale Your Website With Flexible Content Models](https://www.youtube.com/watch?v=GcJmJzhVGSk&list=PLCU2qJekvcN04rMcKh-MhddrAfG1Zekub&index=7)

### What do we mean by scalable?

- Enable rapid time to market for new website initiatives
- Minimize friction with your content editors
- Maintain consistent UX for content editor
- Maintain consistent U across the marketing website
- Provide all content editors (SEOs, Marketers, Copywriters) with the autonomy they need to move fast.

### Tips

- Limit your number of content models for your components
  - Hero, Hero Image, Hero Video, Hero Form
  - Confidence Bar, Confidence Bar Scrolling, Confidence Bar Grid
- Use generic naming conventions
  - Accordion opposed to FAQ
- Provide Video Content when you can
- Have a plan for the content model you will use in your site
